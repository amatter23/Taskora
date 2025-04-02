import { useState, useEffect } from "react";
import styles from "./EidCelebration.module.css";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import startAnimation from "./5v9klMpj4f.json";
import { useSelector, useDispatch } from "react-redux";
import { finish } from "../../../store/slice/eidSlice";
import { useSubmitAnswerMutation } from "../../../store/services/eidApi";
const EidCelebration = () => {
  const eidCelebration = useSelector((state) => state.eid);
  const userId = useSelector((state) => state.auth.user.uuid);
  const dispatch = useDispatch();
  const [submitAnswer, { isLoading }] = useSubmitAnswerMutation();
  const [showAnimation, setShowAnimation] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [skipGame, setSkipGame] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [message, setMessage] = useState("");
  const [guessNumber, setGuessNumber] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setGameStarted(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setGuessNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitAnswer({ guessNumber, userId }).unwrap();
      if (result.status === "not_winner") {
        setGameCompleted(true);
        setHasWon(false);
        setMessage(result.message);
      }
      if (result.status === "winner") {
        setGameCompleted(true);
        setHasWon(true);
      }
      if (
        result.status === "already_answered" ||
        result.status === "not-eligible"
      ) {
        setGameCompleted(true);
        setMessage(result.message);
        setHasWon(false);
      }
      if (result.status === "error") {
        setGameCompleted(true);
        setMessage(result.message);
        setHasWon(false);
        setError(true);
      }
    } catch (error) {
      setGameCompleted(true);
      setHasWon(false);
      setMessage(
        "An error occurred while submitting your answer. Please try again later."
      );
      setError(true);
    } finally {
      setGuessNumber("");
    }
  };
  const onClose = () => {
    dispatch(finish());
  };
  const handleSkipGame = () => {
    setSkipGame(true);
    setGameCompleted(true);
    setShowAnimation(false);
  };
  const tryAgain = () => {
    setGuessNumber("");
    setGameCompleted(false);
    setShowAnimation(true);
    setHasWon(false);
    setMessage("");
    setError(null);
  };

  return (
    <>
      {!eidCelebration.finished &&
        !skipGame &&
        (showAnimation ? (
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
                <p>How many months has Taskora.live been alive?</p>

                <form onSubmit={handleSubmit} className={styles.guessForm}>
                  <div className={styles.inputWrapper}>
                    <input
                      type="text"
                      value={guessNumber}
                      onChange={handleInputChange}
                      className={styles.numberInput}
                      placeholder="??"
                      maxLength="2"
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
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      <div className={styles.inputDecoration}>
                        <span className={styles.crescentIcon}>🌙</span>
                      </div>
                    </motion.div>
                  </div>

                  <button
                    type="submit"
                    className={styles.gameButton}
                    disabled={!guessNumber || isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit Guess"}
                  </button>
                </form>

                <button className={styles.skipButton} onClick={handleSkipGame}>
                  Skip Game
                </button>
              </div>
            )}

            {gameCompleted && (
              <div className={styles.resultScreen}>
                {hasWon ? (
                  <>
                    <div className={styles.winScreen}>
                      <h2>Eid Mubarak! 🎊</h2>
                      <div className={styles.winningNumber}>
                        <span className={styles.numberDisplay}>2</span>
                      </div>
                      <p>Your answer is correct! 🎯</p>
                      <p>
                        To get your gift, take a screenshot for this page and
                        send it to us 🎁
                      </p>
                      <br />
                      <button className={styles.gameButton} onClick={onClose}>
                        🚀 Continue to Taskora 🚀
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>Oops! Something went wrong. ❌</h2>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: `${error === true ? "red" : ""}`,
                        }}
                      >
                        {message}
                      </span>
                      <br />
                      {error === true ? "" : "The correct answer is 2 months."}
                    </p>
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.gameButton}
                        onClick={error === true ? tryAgain : onClose}
                      >
                        {error === true ? "Try Again" : "Continue to Taskora"}
                      </button>
                      {error === true ? (
                        <button
                          className={styles.skipButton}
                          onClick={handleSkipGame}
                        >
                          Skip Game
                        </button>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        ))}
    </>
  );
};

export default EidCelebration;
