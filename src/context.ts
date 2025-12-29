import z from "zod";
import {
    ExternalSoftwareSystem,
    Person,
    SoftwareSystem,
    type Element,
} from "./element";
import { GraphBuilder } from "./graph";
import type {
    ContextJSON,
    ExternalSoftwareSystemConfig,
    PersonConfig,
    SoftwareSystemConfig,
} from "./types";

export class Context {
    private title: string;
    private description: string;

    private elements: Element[];

    constructor() {
        this.title = "";
        this.description = "";

        this.elements = [];
    }

    public setTitle(title: string): void {
        if (z.string().min(1).max(100).safeParse(title).success) {
            this.title = title;
            return;
        }

        throw new Error("Error setting title to Context Diagram");
    }

    public setDescription(description: string): void {
        if (z.string().min(1).max(100).safeParse(description).success) {
            this.description = description;
            return;
        }

        throw new Error("Error setting description to Context Diagram");
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    // Actors
    public addPerson(config: PersonConfig): Person {
        const person = new Person(config);
        this.elements.push(person);
        return person;
    }

    public addSoftwareSystem(config: SoftwareSystemConfig): SoftwareSystem {
        const softwareSystem = new SoftwareSystem(config);
        this.elements.push(softwareSystem);
        return softwareSystem;
    }

    public addExternalSoftwareSystem(
        config: ExternalSoftwareSystemConfig,
    ): ExternalSoftwareSystem {
        const externalSoftwareSystem = new ExternalSoftwareSystem(config);
        this.elements.push(externalSoftwareSystem);
        return externalSoftwareSystem;
    }

    public getElements(): Element[] {
        return this.elements;
    }

    public toJSON(): ContextJSON {
        const serializedElements = this.elements.map((element) =>
            element.toJSON(),
        );

        return GraphBuilder.build({
            title: this.title,
            description: this.description,
            elements: serializedElements,
        });
    }
}
