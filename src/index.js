require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { getDAOs, getProposals, analyzeProposal } = require('./advisor');

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', agent: 'DAO-Advisor' });
});

// Get list of popular DAOs
app.get('/api/daos', async (req, res) => {
  try {
    const daos = await getDAOs();
    res.json(daos);
  } catch (error) {
    console.error('DAO list error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch DAOs' });
  }
});

// Get proposals for a DAO
app.get('/api/proposals/:daoId', async (req, res) => {
  try {
    const { daoId } = req.params;
    const proposals = await getProposals(daoId);
    res.json(proposals);
  } catch (error) {
    console.error('Proposals error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch proposals' });
  }
});

// Analyze a specific proposal
app.post('/api/analyze', async (req, res) => {
  try {
    const { proposal, userPreferences } = req.body;

    if (!proposal) {
      return res.status(400).json({ error: 'Proposal data required' });
    }

    const analysis = await analyzeProposal(proposal, userPreferences);
    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze proposal' });
  }
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`DAO-Advisor running on http://localhost:${PORT}`);
});
