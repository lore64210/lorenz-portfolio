import GraphNode from "@/components/miniprojects/classes/graphs/GraphNode";

export default class Graph {
    vertices = [];
    isDirectional = false;
    isWeighted = false;
    minimumPath = [];

    constructor(isDirectional, isWeighted) {
        this.isDirectional = !!isDirectional;
        this.isWeighted = !!isWeighted;
    }

    getVertices() {
        return this.vertices;
    }

    addVertex(value) {
        this.vertices.push(
            value instanceof GraphNode ? value : new GraphNode(value)
        );
    }

    addEdge(source, destination, weight = 1) {
        let sourceNode = null;
        let destinationNode = null;
        this.vertices.forEach((vertex) => {
            if (vertex.getValue() === source) {
                sourceNode = vertex;
            } else if (vertex.getValue() === destination) {
                destinationNode = vertex;
            }
        });
        if (!sourceNode || !destinationNode) return;

        const edgeWeight = this.isWeighted ? weight : 1;
        sourceNode.addEdge(destinationNode, edgeWeight);
        if (!this.isDirectional) {
            destinationNode.addEdge(sourceNode, edgeWeight);
        }
    }

    _resetVertices() {
        this.vertices.forEach((vertex) => {
            vertex.setSearched(false);
            vertex.setDistance(null);
        });
    }

    breadthFirstSearch(searchedValue) {
        let queue = [this.vertices[0]];
        let found = null;
        while (!found && queue.length) {
            const vertex = queue.shift();
            const value = vertex.getValue();
            vertex.setSearched(true);
            const newEdges = vertex
                .getEdges()
                .filter((edge) => !edge.node.getSearched());
            if (JSON.stringify(searchedValue) === JSON.stringify(value)) {
                found = vertex;
                break;
            }
            queue = [...queue, ...newEdges.map((edge) => edge.node)];
        }
        this._resetVertices();
        return found;
    }

    findMinimumPath(searchedValue) {
        const searchedNode = this.breadthFirstSearch(searchedValue);
        this._resetVertices();
        this.aStarSearch(searchedNode);
    }

    heuristic(a, b) {
        // Diagonal distance.
        const x = b.getPositionX() - a.getPositionX();
        const y = b.getPositionY() - a.getPositionY();
        return Math.ceil(Math.sqrt(x * x + y * y) / 10);
    }

    aStarSearch(searchedNode) {
        if (!searchedNode) return;

        const start = this.vertices[0];
        start.setDistance(0);
        start.heuristic = this.heuristic(start, searchedNode);

        const openSet = [start];
        const closedSet = new Set();

        while (openSet.length) {
            openSet.sort(
                (a, b) =>
                    a.distance + a.heuristic - (b.distance + b.heuristic)
            );
            const current = openSet.shift();

            if (current === searchedNode) {
                this.minimumPath = [];
                let node = current;
                while (node.previousNode) {
                    this.minimumPath = [node.previousNode, ...this.minimumPath];
                    node = node.previousNode;
                }
                return;
            }

            closedSet.add(current);

            current.getEdges().forEach(({ node, weight }) => {
                if (closedSet.has(node)) return;

                const distance = current.distance + weight;
                if (!openSet.includes(node)) {
                    node.setDistance(distance);
                    openSet.push(node);
                } else if (node.distance === null || distance < node.distance) {
                    node.setDistance(distance);
                }
                node.heuristic = this.heuristic(node, searchedNode);
                node.previousNode = current;
            });
        }
    }

    *aStarSearchGenerator(searchedNode) {
        // f(n) = g(n) + h(n): g is the actual cost, h the heuristic.
        const start = this.vertices[0];
        start.setDistance(0);
        start.heuristic = this.heuristic(start, searchedNode);

        let openSet = [start];
        const closedSet = [];

        yield;
        while (openSet.length) {
            openSet = openSet.sort(
                (a, b) =>
                    a.distance + a.heuristic - (b.distance + b.heuristic)
            );
            const current = openSet[0];
            current.currentCell = true;

            if (current === searchedNode) return;

            openSet.splice(0, 1);
            closedSet.push(current);

            current.getEdges().forEach(({ node, weight }) => {
                if (node.isObstacle || closedSet.includes(node)) return;

                const distance = current.distance + weight;
                node.heuristic = this.heuristic(node, searchedNode);
                if (!openSet.includes(node)) {
                    node.setDistance(distance);
                    openSet.push(node);
                } else if (node.distance === null || distance < node.distance) {
                    node.setDistance(distance);
                }
                node.setSearched(true);
            });
            yield;
        }
    }
}
