'use client'

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function NetworkGraphViz({ width = 350, height = 250 }) {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Clear any existing SVG content
        d3.select(svgRef.current).selectAll('*').remove();

        const svg = d3.select(svgRef.current)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // Create graph data - force-directed network
        const nodes = [
            { id: 0, group: 1, x: width / 2, y: height / 2 },
            { id: 1, group: 2, x: width * 0.3, y: height * 0.3 },
            { id: 2, group: 2, x: width * 0.7, y: height * 0.3 },
            { id: 3, group: 2, x: width * 0.2, y: height * 0.6 },
            { id: 4, group: 2, x: width * 0.5, y: height * 0.7 },
            { id: 5, group: 2, x: width * 0.8, y: height * 0.6 },
            { id: 6, group: 3, x: width * 0.15, y: height * 0.25 },
            { id: 7, group: 3, x: width * 0.85, y: height * 0.25 },
            { id: 8, group: 3, x: width * 0.4, y: height * 0.85 },
            { id: 9, group: 3, x: width * 0.6, y: height * 0.15 },
        ];

        const links = [
            { source: 0, target: 1, value: 2 },
            { source: 0, target: 2, value: 2 },
            { source: 0, target: 3, value: 2 },
            { source: 0, target: 4, value: 2 },
            { source: 0, target: 5, value: 2 },
            { source: 1, target: 6, value: 1 },
            { source: 2, target: 7, value: 1 },
            { source: 2, target: 9, value: 1 },
            { source: 3, target: 6, value: 1 },
            { source: 4, target: 8, value: 1 },
            { source: 5, target: 7, value: 1 },
            { source: 1, target: 3, value: 1 },
            { source: 2, target: 5, value: 1 },
        ];

        // Create force simulation
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(60))
            .force('charge', d3.forceManyBody().strength(-150))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(25));

        // Create color scale
        const colorScale = d3.scaleOrdinal()
            .domain([1, 2, 3])
            .range(['#879f85', '#a8bfa6', '#5a6b58']);

        // Create links
        const link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', '#cbd5c9')
            .attr('stroke-width', d => d.value * 1.5)
            .attr('stroke-opacity', 0.6);

        // Create nodes
        const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('r', d => d.group === 1 ? 18 : d.group === 2 ? 12 : 8)
            .attr('fill', d => colorScale(d.group))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2);

        // Add glow effect to central node
        const defs = svg.append('defs');
        const filter = defs.append('filter')
            .attr('id', 'glow');
        filter.append('feGaussianBlur')
            .attr('stdDeviation', '3')
            .attr('result', 'coloredBlur');
        const feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        node.filter(d => d.group === 1)
            .style('filter', 'url(#glow)');

        // Update positions on simulation tick
        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });

        // Add pulsing animation to central node
        const centralNode = node.filter(d => d.group === 1);
        function pulse() {
            centralNode
                .transition()
                .duration(1500)
                .attr('r', 20)
                .transition()
                .duration(1500)
                .attr('r', 18)
                .on('end', pulse);
        }
        pulse();

        // Add data flow animation
        const flowPaths = [
            { source: nodes[1], target: nodes[0] },
            { source: nodes[2], target: nodes[0] },
            { source: nodes[5], target: nodes[0] },
        ];

        flowPaths.forEach((path, i) => {
            setTimeout(() => {
                const flowParticle = svg.append('circle')
                    .attr('r', 3)
                    .attr('fill', '#10b981')
                    .attr('opacity', 0.8);

                function animateFlow() {
                    flowParticle
                        .attr('cx', path.source.x)
                        .attr('cy', path.source.y)
                        .transition()
                        .duration(2000)
                        .attr('cx', path.target.x)
                        .attr('cy', path.target.y)
                        .transition()
                        .duration(0)
                        .on('end', animateFlow);
                }
                animateFlow();
            }, i * 700);
        });

        // Cleanup on unmount
        return () => {
            simulation.stop();
            svg.selectAll('*').interrupt();
        };
    }, [width, height]);

    return (
        <svg
            ref={svgRef}
            style={{
                width: '100%',
                height: '100%',
            }}
        />
    );
}
