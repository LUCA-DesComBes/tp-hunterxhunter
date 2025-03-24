const container = document.querySelector("main");

function createElement(tag, attributes = {}, textContent = "") {
	const element = document.createElement(tag);
	for (const key in attributes) {
		if (key === "className") element.className = attributes[key];
		else element.setAttribute(key, attributes[key]);
	}
	if (textContent) element.textContent = textContent;
	return element;
}

function createCard(number, name, rank, image, description) {
	const article = createElement("article");

	const sectionHead = createElement("section", { className: "head" });
	article.appendChild(sectionHead);

	const sectionMiddle = createElement("section", { className: "middle" });
	article.appendChild(sectionMiddle);

	const sectionFoot = createElement("section", { className: "foot" });
	article.appendChild(sectionFoot);

	const h2Number = createElement("h2", { className: "border-dashed" }, number);
	sectionHead.appendChild(h2Number);

	const h2Title = createElement("h2", { className: "title" }, name);
	sectionHead.appendChild(h2Title);

	const h2Rank = createElement("h2", { className: "border-dashed" }, rank);
	sectionHead.appendChild(h2Rank);

	const imgSection = createElement("img", { src: image, alt: number });
	sectionMiddle.appendChild(imgSection);

    const divTextArea = createElement("div", { className: "text-area"})
    sectionFoot.appendChild(divTextArea);

    const firstPara = createElement("p", { className: "text-area-para"}, description);
    divTextArea.appendChild(firstPara);

	return article;
}
fetch("./data.json")
	.then((response) => {
		if (!response.ok) {
			throw new Error("Erreur lors du chargement du fichier");
		}
		return response.json();
	})
	.then((data) => {
		for (let i = 0; i < data.length; i++) {
		const myCard = createCard(data[i].number, data[i].name, data[i].rank, data[i].image, data[i].description);
		container.appendChild(myCard);
		}
	})
	.catch((error) => {
		console.error("Erreur:", error);
	});