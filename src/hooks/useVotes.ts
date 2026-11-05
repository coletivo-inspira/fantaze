import { useCallback, useEffect, useState } from 'react';
import { votesService } from '../services/votesService';
import type { VoteTally } from '../types';

export function useVotes() {
  const [tally, setTally] = useState<VoteTally[]>([]);
  const [myVote, setMyVote] = useState<string | null>(() => votesService.getMyVote());
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    votesService.getTally().then((data) => {
      if (!alive) return;
      setTally(data);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);

  const vote = useCallback(async (id: string) => {
    setPendingId(id);
    const data = await votesService.vote(id);
    setTally(data);
    setMyVote(votesService.getMyVote());
    setPendingId(null);
  }, []);

  const suggest = useCallback(async (name: string) => {
    const data = await votesService.suggest(name);
    setTally(data);
  }, []);

  const totalVotes = tally.reduce((sum, t) => sum + t.votes, 0);

  return { tally, myVote, loading, pendingId, vote, suggest, totalVotes };
}
