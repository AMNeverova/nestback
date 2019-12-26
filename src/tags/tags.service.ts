import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Posts } from 'src/entities/posts.entity';
import { Tags } from 'src/entities/tags.entity';

@Injectable()
export class TagsService {

    constructor(private entities: EntityManager) { }

    async addTag(tags) {
        let tagsPromisesArray = tags.map(async (tag) => {
            let isPresent = await this.entities.findOne(Tags, { content: tag });
            if (!isPresent) {
                console.log('new tag is being added')
                let tagEntity = new Tags();
                tagEntity.content = tag;
                console.log(tagEntity)
                await this.entities.save(tagEntity);
                return 'done'
            }
            return 'done'
        })
        let results = Promise.all(tagsPromisesArray)
        return results;
    }
}
