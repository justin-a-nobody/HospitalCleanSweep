
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Sparkle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

interface QuizProps {
    questions: QuizQuestion[];
    moduleId: string; // To potentially save progress/results later
}

const Quiz: React.FC<QuizProps> = ({ questions, moduleId }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number | null }>({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const { toast } = useToast();

     // Ensure component only renders fully on the client to avoid hydration issues with state
    useEffect(() => {
        setIsClient(true);
    }, []);


    const handleAnswerSelect = (questionId: string, optionIndex: number) => {
        if (showResults) return; // Don't allow changes after submitting
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex,
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handleSubmitQuiz = () => {
         const currentQuestion = questions[currentQuestionIndex];
         const selectedAnswer = selectedAnswers[currentQuestion.id];

         if (selectedAnswer === null || selectedAnswer === undefined) {
            toast({
                title: "Please select an answer",
                description: "You must choose an option before submitting.",
                variant: "destructive",
            });
            return;
        }

        // Calculate score
        let correctAnswers = 0;
        questions.forEach(q => {
            if (selectedAnswers[q.id] === q.correctAnswerIndex) {
                correctAnswers++;
            }
        });
        const finalScore = (correctAnswers / questions.length) * 100;
        setScore(finalScore);
        setShowResults(true);

        // In a real app, you'd save the results (moduleId, score, completion status)
        console.log(`Quiz for module ${moduleId} submitted. Score: ${finalScore.toFixed(0)}%`);
        toast({
            title: "Quiz Submitted!",
            description: `Your score: ${finalScore.toFixed(0)}%`,
        });
        // Potentially trigger a parent component state update to mark module as complete if score is sufficient
    };

     const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setShowResults(false);
        setScore(0);
         toast({
            title: "Quiz Restarted",
            description: "Good luck!",
        });
    };


    if (!isClient) {
         // Render a loading state or null on the server
         return (
             <div className="flex items-center justify-center p-6 bg-muted/50 rounded-md">
                 <Sparkle className="w-5 h-5 animate-spin text-primary mr-2" />
                 <p className="text-muted-foreground">Loading quiz...</p>
             </div>
         );
     }

     if (showResults) {
        return (
            <Card>
                 <CardHeader>
                    <CardTitle className="text-xl">Quiz Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className={`text-2xl font-bold text-center ${score >= 70 ? 'text-green-600' : 'text-destructive'}`}>
                        Your Score: {score.toFixed(0)}%
                    </p>
                    {score >= 70 ? (
                         <p className="text-center text-green-600 flex items-center justify-center gap-2">
                            <CheckCircle className="w-5 h-5"/> Congratulations, you passed!
                         </p>
                    ) : (
                        <p className="text-center text-destructive flex items-center justify-center gap-2">
                             <XCircle className="w-5 h-5"/> Needs Improvement. Please review the material and try again.
                        </p>
                    )}

                     {/* Optional: Show detailed results */}
                     <div className="space-y-3 pt-4 border-t">
                         <h4 className="font-semibold">Review Answers:</h4>
                         {questions.map((q, index) => (
                             <div key={q.id} className="text-sm p-2 border rounded-md">
                                 <p className="font-medium mb-1">{index + 1}. {q.question}</p>
                                 <p className={`flex items-center gap-1 ${selectedAnswers[q.id] === q.correctAnswerIndex ? 'text-green-600' : 'text-destructive'}`}>
                                     {selectedAnswers[q.id] === q.correctAnswerIndex ? <CheckCircle className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}
                                     Your Answer: {q.options[selectedAnswers[q.id] ?? -1] ?? <i>Not answered</i>}
                                     {selectedAnswers[q.id] !== q.correctAnswerIndex && (
                                         <span className="text-green-600 ml-2">(Correct: {q.options[q.correctAnswerIndex]})</span>
                                     )}
                                 </p>
                             </div>
                         ))}
                     </div>
                </CardContent>
                 <CardFooter className="flex justify-center">
                    <Button onClick={handleRestartQuiz} variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" /> Restart Quiz
                    </Button>
                </CardFooter>
            </Card>
        );
     }


    const currentQuestion = questions[currentQuestionIndex];
    const selectedOptionIndex = selectedAnswers[currentQuestion.id] ?? null;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                <p className="text-muted-foreground text-sm pt-1">{currentQuestion.question}</p>
            </CardHeader>
            <CardContent>
                <RadioGroup
                    value={selectedOptionIndex !== null ? selectedOptionIndex.toString() : undefined}
                    onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
                    className="space-y-3"
                    aria-label={`Options for question: ${currentQuestion.question}`}
                >
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-accent/50 has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary transition-colors">
                            <RadioGroupItem value={index.toString()} id={`${currentQuestion.id}-option-${index}`} />
                            <Label htmlFor={`${currentQuestion.id}-option-${index}`} className="flex-1 cursor-pointer text-sm">
                                {option}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
                 <span className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} / {questions.length}</span>
                 {currentQuestionIndex < questions.length - 1 ? (
                     <Button onClick={handleNextQuestion} disabled={selectedOptionIndex === null}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                 ) : (
                     <Button onClick={handleSubmitQuiz} disabled={selectedOptionIndex === null}>
                         Submit Quiz <CheckCircle className="ml-2 h-4 w-4" />
                     </Button>
                 )}
            </CardFooter>
        </Card>
    );
};

export default Quiz;
