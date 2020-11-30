
class makeGraph {
    constructor(mainCls, width = '375', height = '50', colors = ['red', 'green', 'blue']) {
        this.colors = {};
        this.colors.percent = colors[1];
        this.colors.all = colors[0];
        this.colors.first = colors[2];
        this.width = width;
        this.height = height;
        // this.div = document.querySelector(mainCls);
        this.div = mainCls;
        this.div.style.position = 'relative';
        this.div.style.width = width + 'px'
        this.div.style.height = "100%"
        this.canvas = document.createElement('canvas');
        this.canvas.height = height;
        this.canvas.width = width;
        this.div.appendChild(this.canvas);
    }

    recreateUl(em) {
        if (this[em]) {
            this[em].querySelectorAll('li').forEach(e => e.remove());
        } else {
            this[em] = document.createElement('ul');
            this.div.appendChild(this[em]);
        }
        return this[em];
    }

    makeLegend(object) {
        this.legend = this.recreateUl('legend');
        this.legend.style.marginTop = '30px';
        this.legend.style.display = 'flex';
        this.legend.style.flexDirection = 'column';
        this.legend.style.justifyContent = "center"
        this.legend.style.width = '100%';
        const makeLi = (color, text) => {
            const li = document.createElement('li');
            const colorBlock = document.createElement('div');
            colorBlock.style.backgroundColor = color;
            colorBlock.style.width = 30 + 'px';
            colorBlock.style.height = 30 + 'px';
            colorBlock.style.marginRight = '5px';
            const textBlock = document.createElement('p');
            textBlock.style.textAlign = 'left';
            textBlock.innerText = text;
            li.appendChild(colorBlock);
            li.appendChild(textBlock);
            li.style.display = 'flex';
            li.style.fontSize = this.width / 45 + 'px';
            li.style.padding = '1px';
            li.style.justifyContent = "center"
            li.style.marginBottom = "5px";
            li.style.textTransform = 'uppercase';
            this.legend.appendChild(li);
        }
        makeLi(this.colors.percent, 'Погашено процентами: ' + (object.percentSumm).toFixed(2));
        makeLi(this.colors.all, 'Собственные средства: ' + (object.paySumm).toFixed(2));
        makeLi(this.colors.first, 'Начальный платёж: ' + (object.first).toFixed(2));
        const li = document.createElement('li');
        return this.legend
    }

    makeList(object) {
        this.list = this.recreateUl('list');
        this.list.style.marginTop = '30px'
        this.list.style.display = 'flex'
        this.list.style.flexDirection = 'column'
        this.list.style.width = '100%';
        object.payments.forEach(month => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.fontSize = this.width / 45 + 'px'
            li.style.padding = '1px';
            li.style.alignItems = "center"
            li.style.justifyContent = "space-between"
            li.style.marginBottom = "5px";
            li.style.textTransform = 'uppercase';
            const monthBlock = document.createElement('p');
            const currentBlock = document.createElement('p');
            const percentsBlock = document.createElement('p');
            const nextBlock = document.createElement('p');
            const sumBlock = document.createElement('p');
            li.appendChild(monthBlock);
            li.appendChild(currentBlock);
            li.appendChild(percentsBlock);
            li.appendChild(nextBlock);
            li.appendChild(sumBlock);
            monthBlock.innerText = month.month;
            currentBlock.innerText = month.curconto.toFixed(2);
            percentsBlock.innerText = month.percents.toFixed(2);
            sumBlock.innerText = month.count.toFixed(2);
            nextBlock.innerText = month.payUp.toFixed(2);
            this.list.appendChild(li);
        });
        return this.list;
    }

    draw(object) {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const maxPay = Math.max(...object.payments.map(e => e.count));
        const aspect = this.height / maxPay;
        const margin = 2;
        const barWidth = (this.width / object.payments.length) - margin;
        let x = 0;
        object.payments.forEach(month => {
            ctx.fillStyle = this.colors.percent;
            ctx.fillRect(x, this.height, barWidth, -(month.count * aspect));
            ctx.fillStyle = this.colors.all;
            ctx.fillRect(x, this.height, barWidth, -((month.count - month.percents) * aspect));
            ctx.fillStyle = this.colors.first;
            ctx.fillRect(x, this.height, barWidth, -(object.first * aspect));
            x += barWidth + margin;
        });
    }

    drawGraph(t) {
        this.draw(t);
        this.makeLegend(t);
        this.makeList(t);
    }
}



// Graph block
function makeGraphEm(cost, rate, term, first, name = 'test') {
    const graphDiv = document.createElement("div");
    graphDiv.classList.add('graph');
    graphDiv.style.margin = "0 auto";
    newCreatedBlock.appendChild(graphDiv);
    const td = calc(cost, rate, term, first, name);
    const graph = new makeGraph(graphDiv, newCreatedBlock.offsetWidth * 2 / 3, 200);
    graph.drawGraph(td);
    return graphDiv;
}

makeGraphEm(1000, 1, 5, 100);