import { useState, useEffect } from 'react';
import styles from './EidCelebration.module.css';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import startAnimation from './5v9klMpj4f.json';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const EidCelebration = ({ onClose }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [guessNumber, setGuessNumber] = useState('');
  const { width, height } = useWindowSize();

  const [luckyNumber] = useState(() => {
    return Math.floor(Math.random() * 90) + 0;
  });

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setGameStarted(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handleInputChange = e => {
    const value = e.target.value;
    // Only allow 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setGuessNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!guessNumber) return;

    // Convert to number for comparison
    const userGuess = parseInt(guessNumber);

    if (userGuess === luckyNumber) {
      setHasWon(true);
      // Save in localStorage that user won the Eid game
      localStorage.setItem('eidGameWon', 'true');
    }

    setGameCompleted(true);
  };

  const handlePlayAgain = () => {
    setGameCompleted(false);
    setGuessNumber('');
  };

  return (
    <>
      {showAnimation ? (
        <div className={styles.animationContainer}>
          <Lottie
            className={styles.startAnimation}
            animationData={startAnimation}
            loop={false}
          />
        </div>
      ) : (
        <motion.div
          className={styles.gameContainer}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {!showAnimation && gameStarted && !gameCompleted && (
            <div className={styles.gamePlayScreen}>
              <h2 className={styles.eidTitle}>Eid Special Game!</h2>
              <p>
                Guess the blessed Eid number (10-99) to receive a special Eid
                badge!
              </p>

              <form onSubmit={handleSubmit} className={styles.guessForm}>
                <div className={styles.inputWrapper}>
                  <input
                    type='text'
                    value={guessNumber}
                    onChange={handleInputChange}
                    className={styles.numberInput}
                    placeholder='??'
                    maxLength='2'
                    autoFocus
                  />
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{
                      y: [10, 0, 10],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'easeInOut',
                    }}
                  >
                    <div className={styles.inputDecoration}>
                      <span className={styles.crescentIcon}>🌙</span>
                    </div>
                  </motion.div>
                </div>

                <button
                  type='submit'
                  className={styles.gameButton}
                  disabled={!guessNumber}
                >
                  Submit Guess
                </button>
              </form>

              <button className={styles.skipButton} onClick={onClose}>
                Skip Game
              </button>
            </div>
          )}

          {gameCompleted && (
            <div className={styles.resultScreen}>
              {hasWon ? (
                <>
                  <div className={styles.winScreen}>
                    {/* <ReactConfetti
                      width={width}
                      height={height}
                      numberOfPieces={400}
                      recycle={false}
                      colors={[
                        '#d4af37',
                        '#ffffff',
                        '#50C878',
                        '#87CEEB',
                        '#FFC0CB',
                      ]}
                    /> */}
                    <h2>Eid Mubarak! 🎉</h2>
                    <div className={styles.winningNumber}>
                      <span className={styles.numberDisplay}>
                        {luckyNumber}
                      </span>
                    </div>
                    <p>
                      You guessed the blessed Eid number!
                      <br />
                      Your Eid badge has been added to your profile.
                    </p>
                    <p>
                      To get your gift take a screenshot from your page and the
                      email sent to you to us
                    </p>
                    <br />
                    <button className={styles.gameButton} onClick={onClose}>
                      Continue to Taskora
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>Better luck next time</h2>
                  <p>
                    The blessed number was <strong>{luckyNumber}</strong>.
                    <br />
                    Your guess was <strong>{guessNumber}</strong>.
                  </p>
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.gameButton}
                      onClick={handlePlayAgain}
                    >
                      Try Again
                    </button>
                    <button className={styles.skipButton} onClick={onClose}>
                      Maybe Later
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default EidCelebration;
