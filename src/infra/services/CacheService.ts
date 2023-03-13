import { InjectRedis } from "@liaoliaots/nestjs-redis";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import Redis from "ioredis";
import { CacheServiceInterface } from "../../domain/services/CacheServiceInterface";

@Injectable()
export class CacheService implements CacheServiceInterface {
  constructor(
    private readonly logger: Logger,
    @InjectRedis() private readonly redisClient: Redis,
  ) { }

  public async saveObject(key: string, object: Record<string, any>, expire = 3600):Promise<void> {
    try {
      this.logger.verbose(`Storing cache key ${key} from redis`)
      const stringify = JSON.stringify(object);

      await this.redisClient.set(key, stringify);
      await this.redisClient.expire(key, expire);
    } catch (err) {
      this.logger.error(err)
      throw new InternalServerErrorException("Fail Storing to Redis", err.stack)
    }
  }

  public async getObject(key: string):Promise<Record<string, any>> {
    try {
      this.logger.verbose(`Getting cache key ${key} from redis`)
      return await this.redisClient.get(key).then((value) => {
        return JSON.parse(value);
      });
    } catch (err) {
      this.logger.error(err)
      throw new InternalServerErrorException("Fail Getting from Redis", err.stack)
    }
  }

  public async remove(key: string):Promise<void> {
    try {
      this.logger.verbose(`Remove cache key ${key} from redis`)
      await this.redisClient.del(key);
    } catch (err) {
      this.logger.error(err)
      throw new InternalServerErrorException("Fail Deleting from Redis", err.stack)
    }
  }
}