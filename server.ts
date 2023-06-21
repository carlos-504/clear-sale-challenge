import server from './src/app';
import logger from './src/config/logger';

const port = process.env.PORT || 3000;

server.listen(port, () => {
   logger.info(`Server running on port ${port}`);
});
