import React, { useState, createContext, useContext } from 'react';

// Define mood color palettes
const moodThemes = {
  happy: {
    primary: '#FFD700',
    secondary: '#FFA500',
    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
    textColor: '#333',
    animationType: 'bounce'
  },
  calm: {
    primary: '#4ECDC4',
    secondary: '#45B7D1',
    background: 'linear-gradient(135deg, #A5F1E9, #4ECDC4)',
    textColor: '#2C3E50',
    animationType: 'fade'
  },
  energetic: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: 'linear-gradient(135deg, #FF6B6B, #FFA500)',
    textColor: '#FFFFFF',
    animationType: 'pulse'
  },
  melancholic: {
    primary: '#8E44AD',
    secondary: '#9B59B6',
    background: 'linear-gradient(135deg, #34495E, #2C3E50)',
    textColor: '#ECF0F1',
    animationType: 'slowFade'
  }
};

// Styles object
const styles = {
  appContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  moodSelector: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  moodButton: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
  },
  activeMoodButton: {
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    transform: 'scale(1.1)',
  },
  contentDisplay: {
    padding: '30px',
    borderRadius: '15px',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.5s ease',
  },
  moodTitle: {
    marginBottom: '15px',
    fontSize: '2rem',
  },
  moodIndicator: {
    fontSize: '4rem',
    marginTop: '20px',
  },
  animations: {
    bounce: {
      animationName: 'bounce',
      animationDuration: '1s',
      animationIterationCount: 'infinite',
    },
    pulse: {
      animationName: 'pulse',
      animationDuration: '1.5s',
      animationIterationCount: 'infinite',
    },
    slowFade: {
      animationName: 'slowFade',
      animationDuration: '3s',
      animationIterationCount: 'infinite',
    }
  }
};

// Keyframes as CSS string
const keyframes = `
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes slowFade {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
`;

// Theme Context for global state management
const ThemeContext = createContext();

// ThemeProvider Component
const ThemeProvider = ({ children }) => {
  const [currentMood, setCurrentMood] = useState('calm');
  const [theme, setTheme] = useState(moodThemes['calm']);

  const updateMood = (mood) => {
    setCurrentMood(mood);
    setTheme(moodThemes[mood]);
  };

  return (
    <ThemeContext.Provider value={{ currentMood, theme, updateMood }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook for Theme Context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// MoodSelector Component
const MoodSelector = () => {
  const { updateMood, currentMood } = useTheme();

  return (
    <div style={styles.moodSelector}>
      {Object.keys(moodThemes).map((mood) => (
        <button
          key={mood}
          style={{
            ...styles.moodButton,
            ...(currentMood === mood ? styles.activeMoodButton : {}),
            backgroundColor: moodThemes[mood].primary,
            color: moodThemes[mood].textColor
          }}
          onClick={() => updateMood(mood)}
        >
          {mood.charAt(0).toUpperCase() + mood.slice(1)}
        </button>
      ))}
    </div>
  );
};

// ContentDisplay Component
const ContentDisplay = () => {
  const { theme, currentMood } = useTheme();

  return (
    <div 
      style={{
        ...styles.contentDisplay,
        background: theme.background,
        color: theme.textColor
      }}
    >
      <h1 style={styles.moodTitle}>
        Current Mood: {currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}
      </h1>
      <p>Experience the world through your current emotional lens.</p>
      <div 
        style={{
          ...styles.moodIndicator,
          ...(styles.animations[theme.animationType] || {})
        }}
      >
        🌈
      </div>
    </div>
  );
};

const MoodThemeSwitcher = () => {
  return (
    <>
      <style>{keyframes}</style>
      <ThemeProvider>
        <div style={styles.appContainer}>
          <MoodSelector />
          <ContentDisplay />
        </div>
      </ThemeProvider>
    </>
  );
};

export default MoodThemeSwitcher;