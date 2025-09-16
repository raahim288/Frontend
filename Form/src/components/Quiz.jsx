import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import Navbar from './Navbar';

// ===== Question Sets (5 Questions Each) =====
const questionSets = {
  general: [
    { id: 1, type: 'mcq', question: 'Who is known as the father of computers?', options: ['Charles Babbage', 'Alan Turing', 'Bill Gates', 'Steve Jobs'], correctAnswer: 'Charles Babbage' },
    { id: 2, type: 'truefalse', question: 'The sun rises in the west.', correctAnswer: 'False' },
    { id: 3, type: 'mcq', question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Venus', 'Jupiter'], correctAnswer: 'Mars' },
    { id: 4, type: 'truefalse', question: 'Water boils at 100°C at sea level.', correctAnswer: 'True' },
    { id: 5, type: 'mcq', question: 'The largest ocean on Earth is?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correctAnswer: 'Pacific' }
  ],
  basics: [
    { id: 1, type: 'mcq', question: 'What is 8 + 5?', options: ['12', '13', '14', '15'], correctAnswer: '13' },
    { id: 2, type: 'mcq', question: 'What is 15 - 7?', options: ['7', '8', '9', '10'], correctAnswer: '8' },
    { id: 3, type: 'mcq', question: 'What is 6 × 7?', options: ['42', '36', '48', '49'], correctAnswer: '42' },
    { id: 4, type: 'truefalse', question: 'Zero is an even number.', correctAnswer: 'True' },
    { id: 5, type: 'truefalse', question: 'The number 11 is a prime number.', correctAnswer: 'True' }
  ],
  algebra: [
    { id: 1, type: 'mcq', question: 'Solve for x: 2x + 5 = 13', options: ['3', '4', '5', '6'], correctAnswer: '4' },
    { id: 2, type: 'mcq', question: 'Factorize x² - 9', options: ['(x-3)(x+3)', '(x-9)(x+1)', '(x-2)(x+2)', 'x(x-9)'], correctAnswer: '(x-3)(x+3)' },
    { id: 3, type: 'truefalse', question: 'The equation x + 2 = 5 has a solution x = 3.', correctAnswer: 'True' },
    { id: 4, type: 'mcq', question: 'If x = 2, find the value of 3x².', options: ['6', '8', '10', '12'], correctAnswer: '12' },
    { id: 5, type: 'truefalse', question: 'x² + x² = 2x²', correctAnswer: 'True' }
  ],
  trigonometry: [
    { id: 1, type: 'mcq', question: 'sin(90°) = ?', options: ['0', '1', '-1', '0.5'], correctAnswer: '1' },
    { id: 2, type: 'mcq', question: 'cos(0°) = ?', options: ['0', '1', '-1', '0.5'], correctAnswer: '1' },
    { id: 3, type: 'truefalse', question: 'tan(45°) = 1', correctAnswer: 'True' },
    { id: 4, type: 'mcq', question: 'sin(30°) = ?', options: ['0.5', '1', '√3/2', '√2/2'], correctAnswer: '0.5' },
    { id: 5, type: 'truefalse', question: 'tan(90°) is undefined.', correctAnswer: 'True' }
  ],
  derivatives: [
    { id: 1, type: 'mcq', question: 'd/dx of x² is?', options: ['x', '2x', 'x²', '2'], correctAnswer: '2x' },
    { id: 2, type: 'mcq', question: 'd/dx of sin(x) = ?', options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'], correctAnswer: 'cos(x)' },
    { id: 3, type: 'truefalse', question: 'The derivative of a constant is 0.', correctAnswer: 'True' },
    { id: 4, type: 'mcq', question: 'd/dx of e^x = ?', options: ['e^x', 'xe', '1', 'ln(x)'], correctAnswer: 'e^x' },
    { id: 5, type: 'truefalse', question: 'The derivative of x³ is 3x².', correctAnswer: 'True' }
  ],
  integration: [
    { id: 1, type: 'mcq', question: '∫ x dx = ?', options: ['x', 'x²/2 + C', '2x + C', 'x² + C'], correctAnswer: 'x²/2 + C' },
    { id: 2, type: 'mcq', question: '∫ 1 dx = ?', options: ['0', 'x + C', '1 + C', 'x² + C'], correctAnswer: 'x + C' },
    { id: 3, type: 'truefalse', question: 'The integral of a constant k is kx + C.', correctAnswer: 'True' },
    { id: 4, type: 'mcq', question: '∫ e^x dx = ?', options: ['e^x + C', 'xe', 'x + C', 'ln(x)'], correctAnswer: 'e^x + C' },
    { id: 5, type: 'truefalse', question: 'The integral of 0 is a constant C.', correctAnswer: 'True' }
  ],
  geometry: [
    { id: 1, type: 'mcq', question: 'Sum of angles in a triangle = ?', options: ['90°', '180°', '270°', '360°'], correctAnswer: '180°' },
    { id: 2, type: 'mcq', question: 'Area of circle = ?', options: ['2πr', 'πr²', 'πd', 'r²'], correctAnswer: 'πr²' },
    { id: 3, type: 'truefalse', question: 'A square has four equal sides.', correctAnswer: 'True' },
    { id: 4, type: 'mcq', question: 'Circumference of circle = ?', options: ['πr²', '2πr', 'πd²', 'πr'], correctAnswer: '2πr' },
    { id: 5, type: 'truefalse', question: 'All rectangles are squares.', correctAnswer: 'False' }
  ],
  probability: [
    { id: 1, type: 'mcq', question: 'Probability of getting heads on a coin toss?', options: ['0', '0.25', '0.5', '1'], correctAnswer: '0.5' },
    { id: 2, type: 'mcq', question: 'Probability of rolling a 6 on a fair die?', options: ['1/2', '1/3', '1/4', '1/6'], correctAnswer: '1/6' },
    { id: 3, type: 'truefalse', question: 'Probability ranges from 0 to 1.', correctAnswer: 'True' },
    { id: 4, type: 'mcq', question: 'Mean of [2,4,6,8]?', options: ['4', '5', '6', '7'], correctAnswer: '5' },
    { id: 5, type: 'truefalse', question: 'Probability of an impossible event is 0.', correctAnswer: 'True' }
  ],
  vectors: [
    { id: 1, type: 'mcq', question: 'Magnitude of vector i + j?', options: ['1', '√2', '2', '√3'], correctAnswer: '√2' },
    { id: 2, type: 'mcq', question: 'Dot product of i and j?', options: ['1', '0', '-1', '2'], correctAnswer: '0' },
    { id: 3, type: 'truefalse', question: 'Cross product of parallel vectors is zero.', correctAnswer: 'True' },
    { id: 4, type: 'mcq', question: 'If A = 2i + 3j and B = i + j, A · B = ?', options: ['5', '8', '2', '3'], correctAnswer: '5' },
    { id: 5, type: 'truefalse', question: 'Unit vector has magnitude 1.', correctAnswer: 'True' }
  ],
  complex: [
    { id: 1, type: 'mcq', question: 'i² = ?', options: ['0', '1', '-1', 'i'], correctAnswer: '-1' },
    { id: 2, type: 'mcq', question: 'Modulus of 3 + 4i = ?', options: ['3', '4', '5', '7'], correctAnswer: '5' },
    { id: 3, type: 'truefalse', question: 'i is an imaginary unit.', correctAnswer: 'True' },
    { id: 4, type: 'mcq', question: 'Conjugate of 2 + 5i is?', options: ['-2 + 5i', '2 - 5i', '-2 - 5i', '2 + 5i'], correctAnswer: '2 - 5i' },
    { id: 5, type: 'truefalse', question: 'Complex numbers are of the form a + bi.', correctAnswer: 'True' }
  ]
};

const categories = [
  { key: 'general', title: 'General Knowledge' },
  { key: 'basics', title: 'Math Basics' },
  { key: 'algebra', title: 'Algebra' },
  { key: 'trigonometry', title: 'Trigonometry' },
  { key: 'derivatives', title: 'Derivatives' },
  { key: 'integration', title: 'Integration' },
  { key: 'geometry', title: 'Geometry' },
  { key: 'probability', title: 'Probability & Statistics' },
  { key: 'vectors', title: 'Vectors & Matrices' },
  { key: 'complex', title: 'Complex Numbers' },
  { key: 'results', title: 'View Results' }
];

export default function QuizDashboard() {
  const [view, setView] = useState('dashboard');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const startQuiz = (category) => {
    setCurrentCategory(category);
    setView('quiz');
    setAnswers({});
  };

  const submitQuiz = () => {
    const questions = questionSets[currentCategory];
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) score++;
    });

    setResults([...results, { category: currentCategory, score, total: questions.length, date: new Date().toLocaleString() }]);
    setView('results');
  };

  const renderDashboard = () => (
   
   <Container >
    
      <Typography sx={{marginTop:8}} variant="h2" gutterBottom>Math Quiz Dashboard</Typography>
      <Grid container spacing={2}>
        {categories.map(cat => (
          <Grid item xs={12} sm={6} md={4} key={cat.key}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card onClick={() => cat.key === 'results' ? setView('results') : startQuiz(cat.key)} style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant="h6">{cat.title}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  const renderQuiz = () => (
    <Container>
      <Typography variant="h5" gutterBottom>{categories.find(c => c.key === currentCategory)?.title}</Typography>
      {questionSets[currentCategory].map(q => (
        <Card key={q.id} style={{ marginBottom: '16px' }}>
          <CardContent>
            <Typography>{q.id}. {q.question}</Typography>
            {q.type === 'mcq' ? (
              <RadioGroup value={answers[q.id] || ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}>
                {q.options.map(opt => (
                  <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                ))}
              </RadioGroup>
            ) : (
              <RadioGroup value={answers[q.id] || ''} onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}>
                <FormControlLabel value="True" control={<Radio />} label="True" />
                <FormControlLabel value="False" control={<Radio />} label="False" />
              </RadioGroup>
            )}
          </CardContent>
        </Card>
      ))}
      <Button variant="contained" color="primary" onClick={submitQuiz}>Submit Quiz</Button>
    </Container>
  );

  const renderResults = () => (
    <Container>
      <Typography variant="h5" gutterBottom>Quiz Results</Typography>
      {results.length === 0 ? (
        <Typography>No results yet.</Typography>
      ) : (
        <List>
          {results.map((result, idx) => (
            <ListItem key={idx}>
              <ListItemText primary={`${categories.find(c => c.key === result.category)?.title} - Score: ${result.score}/${result.total}`} secondary={`Date: ${result.date}`} />
            </ListItem>
          ))}
        </List>
      )}
      <Button variant="outlined" onClick={() => setView('dashboard')}>Back to Dashboard</Button>
    </Container>
  );

  return view === 'dashboard' ? renderDashboard() : view === 'quiz' ? renderQuiz() : renderResults();
}