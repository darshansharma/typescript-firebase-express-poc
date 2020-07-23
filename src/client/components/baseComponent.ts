// import { Database } from "../database/database.js";

export class Component <U extends HTMLFormElement> {
    templateEl: HTMLTemplateElement;
    hostEl: HTMLDivElement;
    element: U;
    constructor(templateId: string, hostId: string, newElementId?: string) {
        this.templateEl = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostEl = document.getElementById(hostId) as HTMLDivElement;
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild as U;
        this.hostEl.insertAdjacentElement(
            'afterbegin',
            this.element
        );
        if (newElementId) {
            this.hostEl.id = newElementId;
        }
    }
}