const Anthropic = require('@anthropic-ai/sdk').default;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Popular Solana DAOs on Realms
const POPULAR_DAOS = [
  {
    id: 'mango',
    name: 'Mango DAO',
    token: 'MNGO',
    description: 'Governance for Mango Markets DeFi protocol',
    realmsUrl: 'https://realms.today/dao/MNGO',
    category: 'DeFi',
  },
  {
    id: 'marinade',
    name: 'Marinade DAO',
    token: 'MNDE',
    description: 'Liquid staking protocol governance',
    realmsUrl: 'https://realms.today/dao/MNDE',
    category: 'Staking',
  },
  {
    id: 'drift',
    name: 'Drift DAO',
    token: 'DRIFT',
    description: 'Perpetuals DEX governance',
    realmsUrl: 'https://realms.today/dao/DRIFT',
    category: 'DeFi',
  },
  {
    id: 'jito',
    name: 'Jito DAO',
    token: 'JTO',
    description: 'MEV infrastructure governance',
    realmsUrl: 'https://realms.today/dao/JTO',
    category: 'Infrastructure',
  },
  {
    id: 'bonk',
    name: 'BONK DAO',
    token: 'BONK',
    description: 'Community memecoin governance',
    realmsUrl: 'https://realms.today/dao/BONK',
    category: 'Community',
  },
  {
    id: 'pyth',
    name: 'Pyth DAO',
    token: 'PYTH',
    description: 'Oracle network governance',
    realmsUrl: 'https://realms.today/dao/PYTH',
    category: 'Infrastructure',
  },
];

// Mock proposals (in production, would fetch from Realms API)
const MOCK_PROPOSALS = {
  mango: [
    {
      id: 'mango-1',
      title: 'Increase Insurance Fund Allocation',
      description: 'Proposal to increase the insurance fund from 5% to 10% of protocol fees to better protect users against potential losses.',
      status: 'voting',
      votesFor: 1250000,
      votesAgainst: 450000,
      endDate: '2026-02-10',
      proposer: '7xK...',
      category: 'Treasury',
    },
    {
      id: 'mango-2',
      title: 'Add SOL/USDC Perpetual Market',
      description: 'Add a new SOL/USDC perpetual futures market with 20x max leverage.',
      status: 'voting',
      votesFor: 890000,
      votesAgainst: 120000,
      endDate: '2026-02-08',
      proposer: '4zP...',
      category: 'Product',
    },
  ],
  marinade: [
    {
      id: 'marinade-1',
      title: 'Validator Delegation Strategy Update',
      description: 'Update the validator selection algorithm to prioritize smaller validators for better network decentralization.',
      status: 'voting',
      votesFor: 5600000,
      votesAgainst: 1200000,
      endDate: '2026-02-09',
      proposer: '9mN...',
      category: 'Protocol',
    },
  ],
  drift: [
    {
      id: 'drift-1',
      title: 'Reduce Trading Fees by 20%',
      description: 'Lower maker fees from 0.02% to 0.016% and taker fees from 0.05% to 0.04% to attract more trading volume.',
      status: 'voting',
      votesFor: 3400000,
      votesAgainst: 2100000,
      endDate: '2026-02-11',
      proposer: '2kL...',
      category: 'Economics',
    },
  ],
  bonk: [
    {
      id: 'bonk-1',
      title: 'Community Grants Program',
      description: 'Allocate 1 trillion BONK for community grants to fund meme creators and developers building on BONK ecosystem.',
      status: 'voting',
      votesFor: 45000000000,
      votesAgainst: 12000000000,
      endDate: '2026-02-12',
      proposer: '8bK...',
      category: 'Community',
    },
  ],
  jito: [
    {
      id: 'jito-1',
      title: 'JTO Staking Rewards Increase',
      description: 'Increase JTO staking APY from 5% to 8% to incentivize long-term holding and reduce sell pressure.',
      status: 'voting',
      votesFor: 7800000,
      votesAgainst: 3200000,
      endDate: '2026-02-10',
      proposer: '5nR...',
      category: 'Economics',
    },
  ],
  pyth: [
    {
      id: 'pyth-1',
      title: 'Add Real Estate Price Feeds',
      description: 'Expand oracle coverage to include real estate price indices for major US cities.',
      status: 'voting',
      votesFor: 12000000,
      votesAgainst: 4500000,
      endDate: '2026-02-09',
      proposer: '3fW...',
      category: 'Product',
    },
  ],
};

async function getDAOs() {
  return POPULAR_DAOS;
}

async function getProposals(daoId) {
  // In production, would fetch from Realms API
  // For demo, using mock data
  const proposals = MOCK_PROPOSALS[daoId] || [];

  return {
    dao: POPULAR_DAOS.find(d => d.id === daoId),
    proposals,
    totalActive: proposals.filter(p => p.status === 'voting').length,
  };
}

async function analyzeProposal(proposal, userPreferences = {}) {
  const preferences = {
    riskTolerance: userPreferences.riskTolerance || 'moderate',
    priorities: userPreferences.priorities || ['decentralization', 'security', 'growth'],
    ...userPreferences,
  };

  const prompt = `You are DAO-Advisor, an AI agent that analyzes DAO governance proposals and provides voting recommendations.

PROPOSAL:
Title: ${proposal.title}
Description: ${proposal.description}
Category: ${proposal.category || 'General'}
Current Votes: ${proposal.votesFor?.toLocaleString() || 0} FOR / ${proposal.votesAgainst?.toLocaleString() || 0} AGAINST
Voting Ends: ${proposal.endDate || 'Unknown'}

USER PREFERENCES:
- Risk Tolerance: ${preferences.riskTolerance}
- Priorities: ${preferences.priorities.join(', ')}

Analyze this proposal and provide:

1. RECOMMENDATION: Vote YES or NO (or ABSTAIN if truly unclear)
2. CONFIDENCE: High/Medium/Low
3. SUMMARY: 2-3 sentence explanation of what this proposal does
4. PROS: 2-3 bullet points
5. CONS: 2-3 bullet points
6. RISKS: Any potential risks to consider
7. REASONING: Why you recommend this vote given user preferences

Keep analysis concise but thorough. Be objective and consider multiple perspectives.

Format your response as:
RECOMMENDATION: [YES/NO/ABSTAIN]
CONFIDENCE: [High/Medium/Low]

SUMMARY:
[text]

PROS:
- [point]
- [point]

CONS:
- [point]
- [point]

RISKS:
[text]

REASONING:
[text]`;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const analysisText = message.content[0].text;

  // Parse recommendation
  const recMatch = analysisText.match(/RECOMMENDATION:\s*(YES|NO|ABSTAIN)/i);
  const confMatch = analysisText.match(/CONFIDENCE:\s*(High|Medium|Low)/i);

  return {
    proposal,
    recommendation: recMatch ? recMatch[1].toUpperCase() : 'ABSTAIN',
    confidence: confMatch ? confMatch[1] : 'Medium',
    analysis: analysisText,
    preferences,
    timestamp: new Date().toISOString(),
  };
}

module.exports = { getDAOs, getProposals, analyzeProposal };
