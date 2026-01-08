'use client'

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function AnalyticsNetworkViz() {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 300;
        const height = 300;

        // Clear any existing SVG content
        d3.select(svgRef.current).selectAll('*').remove();

        const svg = d3.select(svgRef.current)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // Define network data
        const nodes = [
            { id: 'central', x: width / 2, y: height / 2, r: 20, color: '#879f85', type: 'hub' },
            { id: 'user1', x: 80, y: 80, r: 12, color: '#a8bfa6', type: 'user' },
            { id: 'user2', x: 220, y: 80, r: 12, color: '#a8bfa6', type: 'user' },
            { id: 'user3', x: 80, y: 220, r: 12, color: '#a8bfa6', type: 'user' },
            { id: 'user4', x: 220, y: 220, r: 12, color: '#a8bfa6', type: 'user' },
            { id: 'event1', x: 150, y: 50, r: 10, color: '#5a6b58', type: 'event' },
            { id: 'event2', x: 250, y: 150, r: 10, color: '#5a6b58', type: 'event' },
            { id: 'event3', x: 150, y: 250, r: 10, color: '#5a6b58', type: 'event' },
            { id: 'event4', x: 50, y: 150, r: 10, color: '#5a6b58', type: 'event' },
        ];

        const links = nodes.slice(1).map(node => ({
            source: 'central',
            target: node.id
        }));

        // Create connection lines
        const link = svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('x1', d => nodes.find(n => n.id === d.source).x)
            .attr('y1', d => nodes.find(n => n.id === d.source).y)
            .attr('x2', d => nodes.find(n => n.id === d.target).x)
            .attr('y2', d => nodes.find(n => n.id === d.target).y)
            .attr('stroke', 'rgba(255,255,255,0.3)')
            .attr('stroke-width', 2);

        // Animate connections
        link.each(function(d, i) {
            d3.select(this)
                .transition()
                .duration(3000)
                .delay(i * 200)
                .attr('stroke-opacity', 0.6)
                .transition()
                .duration(3000)
                .attr('stroke-opacity', 0.3)
                .on('end', function repeat() {
                    d3.select(this)
                        .transition()
                        .duration(3000)
                        .attr('stroke-opacity', 0.6)
                        .transition()
                        .duration(3000)
                        .attr('stroke-opacity', 0.3)
                        .on('end', repeat);
                });
        });

        // Create nodes
        const node = svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.r)
            .attr('fill', d => d.color)
            .attr('opacity', d => d.type === 'hub' ? 0.9 : d.type === 'user' ? 0.8 : 0.7);

        // Pulse animation for central node
        const centralNode = node.filter(d => d.type === 'hub');
        function pulseCenter() {
            centralNode
                .transition()
                .duration(2000)
                .attr('r', 22)
                .transition()
                .duration(2000)
                .attr('r', 20)
                .on('end', pulseCenter);
        }
        pulseCenter();

        // Create data flow particles
        const particleData = [
            { path: [[80, 80], [150, 150]], delay: 0 },
            { path: [[220, 80], [150, 150]], delay: 1000 },
            { path: [[80, 220], [150, 150]], delay: 2000 },
            { path: [[220, 220], [150, 150]], delay: 3000 },
        ];

        particleData.forEach(({ path, delay }) => {
            setTimeout(() => {
                const particle = svg.append('circle')
                    .attr('r', 3)
                    .attr('fill', '#10b981')
                    .attr('cx', path[0][0])
                    .attr('cy', path[0][1]);

                function animateParticle() {
                    particle
                        .attr('cx', path[0][0])
                        .attr('cy', path[0][1])
                        .transition()
                        .duration(4000)
                        .attr('cx', path[1][0])
                        .attr('cy', path[1][1])
                        .on('end', animateParticle);
                }
                animateParticle();
            }, delay);
        });

        // Create predictive modeling arcs
        const arc1 = d3.arc()
            .innerRadius(0)
            .outerRadius(100)
            .startAngle(-Math.PI / 4)
            .endAngle(Math.PI / 4);

        svg.append('path')
            .attr('d', 'M 100,100 Q 150,120 200,100')
            .attr('stroke', '#879f85')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('opacity', 0.7)
            .attr('stroke-dasharray', '5,5')
            .transition()
            .duration(1000)
            .attr('stroke-dashoffset', 10)
            .on('end', function repeat() {
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr('stroke-dashoffset', 0)
                    .transition()
                    .duration(1000)
                    .attr('stroke-dashoffset', 10)
                    .on('end', repeat);
            });

        svg.append('path')
            .attr('d', 'M 100,200 Q 150,180 200,200')
            .attr('stroke', '#879f85')
            .attr('stroke-width', 3)
            .attr('fill', 'none')
            .attr('opacity', 0.7)
            .attr('stroke-dasharray', '5,5')
            .attr('stroke-dashoffset', 10)
            .transition()
            .duration(1000)
            .attr('stroke-dashoffset', 0)
            .on('end', function repeat() {
                d3.select(this)
                    .transition()
                    .duration(1000)
                    .attr('stroke-dashoffset', 10)
                    .transition()
                    .duration(1000)
                    .attr('stroke-dashoffset', 0)
                    .on('end', repeat);
            });

        // Cleanup on unmount
        return () => {
            svg.selectAll('*').interrupt();
        };
    }, []);

    return (
        <svg
            ref={svgRef}
            style={{
                width: '100%',
                height: '100%',
                maxWidth: '300px',
                maxHeight: '300px'
            }}
        />
    );
}
