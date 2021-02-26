import { Box } from '@chakra-ui/react';
import './App.css';
import Header from './Header';
import TimerManager from './TimerManager';

function App() {
  return (
    <Box>
      <Header />
      <TimerManager />
    </Box>
  );
}

export default App;
