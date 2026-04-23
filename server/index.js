require('dotenv').config();

const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const client = new Anthropic();

app.use(express.json());
app.use(express.static('public'));

app.post('/api/hype', async (req, res) => {
  const { playerName, role } = req.body;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Write punchy, dramatic hype commentary (3-4 sentences) about ${playerName} who plays as ${role} for Manchester United. Make it exciting, like a stadium announcer introducing them. No hashtags. No emojis. Pure drama.`
      }
    ]
  });

  res.json({ hype: response.content[0].text });
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 1024,
    system: `You are a Manchester United squad assistant. Answer questions about the current 2025/26 squad and coaching staff only. 
    
Head coach is Michael Carrick, appointed 13 January 2026. His staff includes Steve Holland, Jonathan Woodgate, Travis Binnion, Jonny Evans and Craig Mawson.

Captain is Bruno Fernandes #8.

Current squad:
Goalkeepers: Altay Bayindir #1, Tom Heaton #22, Andre Onana #24 (on loan), Senne Lammens #31
Defenders: Diogo Dalot #2, Noussair Mazraoui #3, Mathijs De Ligt #4, Harry Maguire #5, Lisandro Martinez #6, Tyrell Malacia #12, Patrick Dorgu #13, Leny Yoro #15, Luke Shaw #23, Ayden Heaven #26, Tyler Fredricson #33, Diego Leon #35, Harry Amass #41 (on loan)
Midfielders: Mason Mount #7, Bruno Fernandes #8, Casemiro #18, Manuel Ugarte #25, Kobbie Mainoo #37, Toby Collyer #43 (on loan), Dan Gore #44 (on loan)
Forwards: Rasmus Hojlund #9 (on loan), Matheus Cunha #10, Joshua Zirkzee #11, Amad #16, Bryan Mbeumo #19, Benjamin Sesko #30, Chido Obi #32, Ethan Wheatley #36 (on loan), Jadon Sancho (on loan), Marcus Rashford (on loan)

Do not discuss Champions League qualification or league position. Only answer questions about the squad and coaching staff. Be passionate but accurate. Keep answers under 100 words unless asked for more detail.`,
    messages: messages
  });

  res.json({ reply: response.content[0].text });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
