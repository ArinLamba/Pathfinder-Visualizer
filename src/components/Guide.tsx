
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { GuideItems } from "./GuideItems";
export const Guide = () => {

  const items = [
    { 
      heading: "Welcome to Pathfinding Visualizer!", 
      subHeading: "This short tutorial will walk you through all of the features of this application.",
      imageSrc: "/Logo.png",
    },
    { 
      heading: "What is a pathfinding algorithm?", 
      subHeading: "At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!",
      para: 'All of the algorithms on this application are adapted for a 2D grid, where 90 degree turns have a "cost" of 1 and movements from a node to another have a "cost" of 1,',
      imageSrc: "/map.png",
    },
    { 
      heading: "Picking an algorithm", 
      subHeading: 'Choose an algorithm from the "Algorithms" drop-down menu',
      para: 'Note that some algorithms are unweighted, while others are weighted. Unweighted algorithms do not take turns or weight nodes into account, whereas weighted ones do. Additionally, not all algorithms guarantee the shortest path',
      imageSrc: "/algoSelect.png",
    },
    { 
      heading: "Meet the algorithms", 
      subHeading: 'Not all algorithms are created equal.',
      algorithms: {
        algo1: {
          head: "Dijkstra's Algorithm ",
          text: 'The father of pathfinding algorithms. guarantees the shortest path'
        },
        algo2: {
          head: "A* Search",
          text: "Arguably the best pathfinding algorithm. uses heuristics to guarantee the shortest path much faster than Dijkstra's Algorithm",
        },
        algo3: {
          head: "Greedy Best-first-Search",
          text: 'A faster, more heuristic-heavy version of A*. does not guarantee the shortest path',
        },
        algo4: {
          head: 'Bidirectional BFS',
          text: ' BFS from both sides. does not guarantee the shortest path',
        },
        algo5: {
          head: 'Breatdh First Search ',
          text: 'A great algorithm; guarantees the shortest path',
        },
        algo6: {
          head: 'Depth First Search ',
          text: 'A very bad algorithm for pathfinding. does not guarantee the shortest path',
        },
      },
    },
    { 
      heading: "Visualizing and more", 
      subHeading: 'Use the navbar buttons to visualize algorithms and to do other stuff!',
      para: 'You can clear the current path, clear walls and weights, clear the entire board, and add mazes, all from the navbar. If you want to access this tutorial again, hover on the " i "  in the top left corner of your screen. You can also toggle between the light and Dark Mode by CLicking on the " Sun " and " Moon " Icon',
      isNav: true,
    },
    { 
      heading: "Enjoy!", 
      subHeading: 'I hope you have just as much fun playing around with this visualization tool as I had building it!',
      para: 'If you want to see the source code for this application, check out my Github',
      imageSrc: "/github.svg",
      href: "https://github.com/ArinLamba/Pathfinder-Visualizer.git",
      isGit: true
    },

  ];

  return (
    <div className="max-h-[720px] max-w-[920px]">
      <Carousel>
        <CarouselContent>
          {items.map((item, idx) => (
            <CarouselItem key={idx}>
              <GuideItems
                pageNo={idx + 1}
                heading={item.heading}
                subHeading={item.subHeading}
                para={item.para}
                algorithms={item.algorithms}
                imageSrc={item.imageSrc}
                isNavImage={item.isNav}
                href={item.href}
                isGit={item.isGit}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious  />
        <CarouselNext />
      </Carousel>
    </div>
  );
};