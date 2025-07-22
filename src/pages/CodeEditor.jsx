import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Editor from "@monaco-editor/react";
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock,
  Target,
  Code,
  Terminal
} from "lucide-react";
import { toast } from "sonner";

export function CodeEditor() {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(`function twoSum(nums, target) {
    // Write your solution here
    
}`);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState(null);

  // Mock problem data - in real app, this would come from API
  const problem = {
    id: problemId || "1",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
      }
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" }
    ]
  };

  const handleRunCode = async () => {
    setIsSubmitting(true);
    toast("Running test cases...");
    
    // Simulate code execution
    setTimeout(() => {
      const mockResults = problem.testCases.map((testCase, index) => ({
        id: index + 1,
        input: testCase.input,
        expectedOutput: testCase.expectedOutput,
        actualOutput: index < 2 ? testCase.expectedOutput : "[1,0]", // Mock some failures
        passed: index < 2,
        executionTime: Math.floor(Math.random() * 50) + 10
      }));
      
      setTestResults(mockResults);
      setIsSubmitting(false);
      
      const passedCount = mockResults.filter(r => r.passed).length;
      if (passedCount === mockResults.length) {
        toast.success(`All ${passedCount} test cases passed!`);
      } else {
        toast.error(`${passedCount}/${mockResults.length} test cases passed`);
      }
    }, 2000);
  };

  const handleSubmit = () => {
    toast.success("Solution submitted successfully!");
    navigate(-1);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-danger text-danger-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-primary/20 bg-card px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold">{problem.title}</h1>
              <Badge className={getDifficultyColor(problem.difficulty)}>
                {problem.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleRunCode}
              disabled={isSubmitting}
              className="hover:bg-primary/10"
            >
              <Play className="h-4 w-4 mr-2" />
              {isSubmitting ? "Running..." : "Run"}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Problem Description */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Problem Description
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {problem.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Examples */}
                  <div>
                    <h3 className="font-semibold mb-3">Examples</h3>
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-4">
                          <div className="text-sm font-medium mb-2">Example {index + 1}:</div>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="font-medium">Input:</span>
                              <code className="ml-2 bg-background px-2 py-1 rounded text-xs">
                                {example.input}
                              </code>
                            </div>
                            <div>
                              <span className="font-medium">Output:</span>
                              <code className="ml-2 bg-background px-2 py-1 rounded text-xs">
                                {example.output}
                              </code>
                            </div>
                            {example.explanation && (
                              <div>
                                <span className="font-medium">Explanation:</span>
                                <span className="ml-2 text-muted-foreground">
                                  {example.explanation}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Constraints */}
                  <div>
                    <h3 className="font-semibold mb-3">Constraints</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {problem.constraints.map((constraint, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <code className="bg-muted px-1 rounded text-xs">{constraint}</code>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Panel - Code Editor and Test Results */}
          <div className="flex flex-col gap-4">
            {/* Code Editor */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Code Editor
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <div className="h-[400px] border-t">
                  <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: "on",
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                      wordWrap: "on"
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {testResults ? (
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {testResults.map((result) => (
                        <div
                          key={result.id}
                          className={`p-3 rounded-lg border ${
                            result.passed
                              ? "border-success/20 bg-success/5"
                              : "border-danger/20 bg-danger/5"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {result.passed ? (
                                <CheckCircle className="h-4 w-4 text-success" />
                              ) : (
                                <XCircle className="h-4 w-4 text-danger" />
                              )}
                              <span className="font-medium text-sm">
                                Test Case {result.id}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {result.executionTime}ms
                            </div>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div>
                              <span className="font-medium">Input:</span>
                              <code className="ml-2 bg-background px-1 rounded">
                                {result.input}
                              </code>
                            </div>
                            <div>
                              <span className="font-medium">Expected:</span>
                              <code className="ml-2 bg-background px-1 rounded">
                                {result.expectedOutput}
                              </code>
                            </div>
                            <div>
                              <span className="font-medium">Actual:</span>
                              <code className={`ml-2 px-1 rounded ${
                                result.passed ? "bg-background" : "bg-danger/10 text-danger"
                              }`}>
                                {result.actualOutput}
                              </code>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>Run your code to see test results</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}