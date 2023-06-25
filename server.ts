import server from './src/app';
import logger from './src/config/logger';
import location from './src/controllers/Location';

const port = process.env.PORT_API || 3000;

location.listPagination().then(() =>
   server.listen(port, () => {
      logger.info(`Server running on port ${port}`);
   })
);
