const express = require('express');

const app = express();

const router = express.Router();

const posts = [
  {
    id: 2,
    author: 'Antonio Neto',
    comment: 'Hoje o dia está maneiro!',
  },
  {
    id: 3,
    author: 'Rodrigo Garga',
    comment: 'To aqui também',
  },
];

router.get('/', (_, res) => {
  return res.status(200).json({ data: posts, ok: true });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const result = posts.find((post) => post.id === parseInt(id));

  if (!result) return res.status(500).json({ error: `the post with ID ${id} does not exists`, ok: false });

  return res.status(200).json({ data: result, ok: true });
});

app.use('/posts', router);

app.use('*', (_, res) => {
  return res.status(404).json({ error: '404 - Not found, bro' });
});

app.listen(3000, (err) => {
  if (err) {
    console.error('Server is going down', err.message);
    return;
  }
  console.log('Server is running on', 3000);
});
