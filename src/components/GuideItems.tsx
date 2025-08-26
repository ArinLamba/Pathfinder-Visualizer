
type Props = {
  pageNo: number;
  heading: string;
  subHeading: string;
  para?: string;
  imageSrc?: string;
  algorithms?: {
    [key: string]: {
      head: string, 
      text: string
    };
  };
  isNavImage?: boolean;
  isGit?: boolean;
  href?: string;
};

export const GuideItems = ({
  pageNo,
  heading,
  subHeading,
  para,
  imageSrc,
  algorithms,
  isNavImage,
  isGit,
  href,
} : Props) =>{
  return (
    <div className="dark:bg-white/5 bg-neutral-900/5 min-w-full min-h-full border dark:border-white/20 rounded-md flex mx-auto justify-center relative">
      <div className="flex flex-col w-full">
        {/* heading */}
        <div className="flex m-4 items-center relative">
          <h1 className="text-4xl text-center mx-auto mt-6 font-geist font-semibold">
            {heading}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-y-6 mt-1 mx-11">
          <h2 className="text-2xl text-center">
            {subHeading}
          </h2>
          
          {para && 
            <p className="text-xl text-center">
              {para}
            </p>
          }
          {/* only for last page */}
          {imageSrc && isGit && 
            <a href={href} target="_blank">
              <img src={imageSrc} alt="image" 
              height={250}
              width={250}
              className="m-5 dark:text-white"
              />
            </a>
          }
          {imageSrc && !isNavImage && !isGit &&
            <img src={imageSrc} alt="image" 
            height={250}
            width={250}
            className="m-5 dark:text-white"
            />
          }
          {algorithms && (
            <div className="space-y-3">
              {Object.values(algorithms).map((algo, idx) => (
                <div key={idx} className="flex">
                  <h4 className="text-sm font-semibold w-44">
                    {algo.head}
                  </h4>
                  <span>:</span>
                  <p className="ml-3 w-full">
                    {algo.text}
                  </p>
                </div>
              ))}
            </div>
          )}
          {isNavImage &&
            <div>
              <img src="/navbarDark.png" alt="image"
                width={1080}
                className="mt-9"
              />
              <img src="/navbarLight.png" alt="image"
                width={1080}
                className="mt-9"
              />
            </div>
          }
          
        </div>
      <p className="absolute bottom-2 right-4 text-lg">{pageNo}</p>
      </div>
    </div>
  );
};