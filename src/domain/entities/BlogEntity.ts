export class BlogEntity {
    private id: number;
    private title: string;
    private content: string;
    private author: string;
    private createdAt: Date;
    private updatedAt: Date;

    private constructor(
        id: number,
        title: string,
        content: string,
        author: string,
        createdAt: Date,
        updateAt: Date
    ) {
        this.id = id
        this.title = title
        this.content = content
        this.author = author
        this.createdAt = createdAt
        this.updatedAt = updateAt
    }

    public static create(
        title: string,
        content: string,
        author: string,
    ): BlogEntity {
        return new BlogEntity(
            null,
            title,
            content,
            author,
            new Date(),
            new Date(),
        )
    }

    public static load(
        id: number,
        title: string,
        content: string,
        author: string,
        createdAt: Date,
        updateAt: Date
    ) {
        return new BlogEntity(
            id,
            title,
            content,
            author,
            createdAt,
            updateAt,
        )
    }

    public getId(): number {
        return this.id;
    }

    public updateId(id: number) {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public updateTitle(title: string) {
        // business validation

        // ...


        this.title = title;
    }

    public getContent(): string {
        return this.content;
    }

    public updateContent(content: string) {
        // business validation

        // ...

        
        this.content = content;
    }

    public getAuthor(): string {
        return this.author;
    }

    public updateAuthor(author: string) {
        // business validation

        // ...

        
        this.author = author;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdateAt(): Date {
        return this.updatedAt;
    }
}