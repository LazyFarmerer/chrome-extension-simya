customElements.define("custom-details", class CustomDetails extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        const data_title = this.getAttribute("data-title") ?? "";
        let data_list = this.getAttribute("data-list");
        try {
            data_list = JSON.parse(data_list);
        } catch (error) {
            data_list = [];
        }
        const li_list = data_list
        .map((value) => `<li>${value}</li>`)
        .reduce((curr, next) => curr+next)

        this.innerHTML = `<style>${this.css}</style>`;
        const details = document.createElement("details");
        details.innerHTML = `
            <summary>${data_title}</summary>
            <ul>${li_list}</ul>
        `;
    
        this.appendChild(details);
    }

    // 출처: https://stackoverflow.com/questions/38213329/how-to-add-css3-transition-with-html5-details-summary-tag-reveal#answer-79142029
    css = `
        details {
            interpolate-size: allow-keywords;

            &::details-content {
                transition: block-size 0.5s, content-visibility 0.5s allow-discrete;
                overflow: hidden;
                block-size: 0;
            }
            &[open]::details-content {
                block-size: auto;
            }
        }
    `;
});