const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config({ path: './config.env' });

const productRoutes = require('./routes/productRoutes');

app.use(express.json({ limit: '10kb' }));
app.use(cors());

app.use('/api/v1/product', productRoutes);

mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connection successful'));

app.listen(process.env.PORT || 6000, () => {
  console.log('server running', process.env.PORT);
});
