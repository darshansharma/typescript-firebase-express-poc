// import { Database } from "../database/database.js";
export class Component {
    constructor(templateId, hostId, newElementId) {
        this.templateEl = document.getElementById(templateId);
        this.hostEl = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        this.hostEl.insertAdjacentElement('afterbegin', this.element);
        if (newElementId) {
            this.hostEl.id = newElementId;
        }
    }
}
//# sourceMappingURL=baseComponent.js.map