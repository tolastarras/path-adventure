import { useEffect, useRef, useMemo, useState } from 'react';
import { AlertBox, NewAchievement, Confetti } from '@/components';
import { useAuthManager } from '@/hooks';
import { calculateScore } from '@/utils/gameLogic';
import { gameResultsHeading, hasAchievedTopScore, hasAchievedGoldMedal } from '@/utils/helpers';
import { updateScoreStats } from '@/utils/storage';
import { gameMessages } from '@/utils/constants';

import './GameStatusAlert.css';

const GameStatus = ({ gameStatus, playerMoves, currentPath, onClose }) => {
  const hasStoredResult = useRef(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { isAuthenticated, user } = useAuthManager();

  const [isGoldMedalPlayer, setIsGoldMedalPlayer] = useState(false);
  const [isTopScorePlayer, setIsTopScorePlayer] = useState(false);

  const gameResult = useMemo(() => {
    if (gameStatus !== 'lost' && gameStatus !== 'won') {
      return null;
    }

    return calculateScore(gameStatus, playerMoves, currentPath);
  }, [gameStatus, playerMoves, currentPath]);

  useEffect(() => {
    if (isAuthenticated && gameResult && !hasStoredResult.current) {
      const { points, stats } = gameResult;
      const { id, avatar, password } = user;

      // 1. FIRST check achievements using current game score
      const goldMedal = hasAchievedGoldMedal(points.total);
      const topScore = hasAchievedTopScore(points.total);

      setIsGoldMedalPlayer(goldMedal);
      setIsTopScorePlayer(topScore);

      if (goldMedal || topScore) {
        setShowConfetti(true);
      }

      // 2. THEN update storage
      const storageResult = {
        userId: id,
        avatar,
        password,
        score: points.total,
        moves: playerMoves.length,
        correctPathLength: currentPath.length,
        accuracy: stats.percentage,
        status: gameStatus
      };

      updateScoreStats(storageResult);
      hasStoredResult.current = true;
    }
  }, [
    gameStatus,
    gameResult,
    playerMoves,
    currentPath,
    isAuthenticated,
    user,
  ]);

  if (!gameResult) return null;

  const { points, stats } = gameResult;
  const { title, variant, description } = gameResultsHeading(stats);

  return (
    <>
      {/* Show confetti when user unlocks a new achievement */}
      {showConfetti && <Confetti
        onComplete={() => setShowConfetti(false)}
      />}
      <AlertBox
        variant={variant}
        title={title}
        description={description}
        onClose={onClose}
      >
        <div className="text-3xl font-bold text-center">
          <p className="text-2xl py-4">Path accuracy: {stats.percentage}% </p>
          <div>
            <span className="mr-3 animate-pulse duration-1000">✨</span>
            <span className="text-2xl md:text-3xl">You earned +{points.total} point{points.total > 1 && 's'}</span>
            <span className="ml-3 animate-pulse duration-1000">✨</span>
          </div>

          {isTopScorePlayer && <NewAchievement
            icon="🏆"
            title="Single Game"
            subtitle="Best Score"
          />}

          {isGoldMedalPlayer && <NewAchievement
            icon="🥇"
            title="1st Place"
            subtitle="Top Score"
          />}

          {!isAuthenticated &&
            <p className="not-authenticated-message">
              {gameMessages.guestAccountMessage}
            </p>
          }
        </div>
      </AlertBox>
    </>
  );
};

export default GameStatus;
