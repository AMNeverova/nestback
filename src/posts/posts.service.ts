import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Posts } from 'src/entities/posts.entity';
import { Service } from 'src/models';
import { Tags } from 'src/entities/tags.entity';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class PostsService extends Service {
    constructor(entities: EntityManager, private tagService: TagsService) {
        super(Posts, entities)
    };

    async getPosts(tags) {
        let tagRep = this.entities.getRepository(Tags);
        let tagsIds = tags.map(async tag => {
            let tagEntity = await tagRep.findOne({ content: tag });
            let tagId = await tagRep.getId(tagEntity)
            return tagId;
        })
        tagsIds = await Promise.all(tagsIds);
        let posts = await this.entities.find(Posts, { relations: ["tag"] });
        for (let i = 0; i < tagsIds.length; i++) {
            posts = posts.filter(post => {
                return post.tag.find(tag => tag.id == tagsIds[i])
            })
        }
        return posts;
    }

    async addTagToPost(id, tags) {
        let postsRep = this.entities.getRepository(Posts);
        let postEntity = await postsRep.findOne(id, { relations: ["tag"] });
        await this.tagService.addTag(tags).then(() => {
            tags.forEach(async tag => {
                let tagEntity = await this.entities.findOne(Tags, { content: tag });
                let tagIsPresent = postEntity.tag.find(tagEnt => tagEnt.content === tag);
                if (!tagIsPresent) {
                    postEntity.tag.push(tagEntity);
                    await this.entities.save(postEntity);
                }
            })
        })

        let resultEntity = await postsRep.findOne(id, { relations: ["tag"] });
        return resultEntity
    }

    async deleteTagsFromPost(id, tags) {
        let postsRep = this.entities.getRepository(Posts);
        let postEntity = await postsRep.findOne(id, { relations: ["tag"] });
        tags.forEach((tagText) => {
            postEntity.tag = postEntity.tag.filter(tag => {
                return tag.content !== tagText;
            })
        })
        this.entities.save(postEntity)
    }

}
