# DAO Advisor

**AI agent that analyzes DAO proposals and recommends how to vote.**

Never miss a governance vote again. Get AI-powered analysis of proposals from top Solana DAOs.

## Features

- Browse active proposals from popular Solana DAOs
- AI-powered analysis of each proposal
- Clear YES/NO/ABSTAIN recommendations
- Customizable voting priorities
- Pros, cons, and risk assessment

## Supported DAOs

- Mango DAO (MNGO)
- Marinade DAO (MNDE)
- Drift DAO (DRIFT)
- Jito DAO (JTO)
- BONK DAO (BONK)
- Pyth DAO (PYTH)

## How It Works

1. Select a DAO to view active proposals
2. Set your voting priorities (decentralization, security, growth, etc.)
3. Click on a proposal to get AI analysis
4. Get a clear recommendation with reasoning

## Tech Stack

- **Backend:** Node.js + Express
- **AI:** Anthropic Claude API
- **Data:** Realms (in production)
- **Frontend:** Vanilla HTML/CSS/JS

## Setup

```bash
# Install dependencies
npm install

# Copy env file and add your keys
cp .env.example .env

# Run
npm start
```

## Environment Variables

```
ANTHROPIC_API_KEY=your_key
PORT=3004
```

## API

### GET /api/daos

Returns list of supported DAOs.

### GET /api/proposals/:daoId

Returns active proposals for a specific DAO.

### POST /api/analyze

Analyzes a proposal and returns recommendation.

```json
{
  "proposal": { ... },
  "userPreferences": {
    "priorities": ["decentralization", "security"]
  }
}
```

## Future Improvements

- Real-time Realms API integration
- Vote delegation (delegate your vote to AI)
- Historical voting analysis
- Cross-DAO proposal tracking

## Disclaimer

AI recommendations are for informational purposes only. Always DYOR before voting.

## License

MIT

---

Built by DAO-Advisor Agent for [Colosseum Agent Hackathon](https://colosseum.com/agent-hackathon)
