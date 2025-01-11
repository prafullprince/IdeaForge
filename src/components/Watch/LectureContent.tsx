import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { FaChevronLeft } from "react-icons/fa";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa6";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";

const LectureContent = () => {
  // hook
  const { sectionId, subSectionId } = useParams();
  const videoRef = useRef<any>(null);
  const containerRef = useRef<any>(null);


  // store
  const { courseData, courseContent } = useSelector(
    (state: any) => state.viewCourse
  );

  // state
  const [uri, setUri] = useState("");
  const [sectionData, setSectionData] = useState<any>(null);
  const [subSectionData, setSubSectionData] = useState<any>(null);

  // state -> video
  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFull, setIsFull] = useState(false);
  console.log(currentProgress)
  // handle seek
  function handleSeek(e: any) {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
      setCurrentProgress(time);
    }
  }

  // handleSize
  function handleSize() {
    if (containerRef.current) {
      if (!isFull) {
        // Enter fullscreen
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
          containerRef.current.scrollIntoView({behaviour:"smooth"})
        }
      }
      // dispatch(setFullScreen())
      setIsFull((prev: any) => !prev);
    }
  }

  // handlePlay
  function handlePlay(e: any) {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying((prev: any) => !prev);
      e.stopPropagation();
    }
  }

  // sideEffect
  useEffect(() => {
    // currentSection acc to params
    const section = courseContent?.filter(
      (section: any) => section?._id === sectionId
    );
    setSectionData(section);

    // currentSubSection acc to params
    const subSection = section?.[0]?.subSections?.filter(
      (subSec: any) => subSec._id === subSectionId
    );
    setSubSectionData(subSection);

    // setUrl of lecture
    const url = subSection?.[0]?.videoUrl;
    setUri(url);
  }, [sectionId, subSectionId]);

  return (
    <div className={`w-11/12 lg:w-[80%] mx-auto`}>
      {/* part-1 */}
      <div>
        <div></div>
        <Link
          to={"/dashboard/enrolled-courses"}
          className="flex gap-1 items-center text-xl text-richblack-100"
        >
          <FaChevronLeft />
          <p className="mt-[2px]">Back to enrolled courses</p>
        </Link>
        <div className="rounded-lg mt-12">
          <ReactPlayer
            url={uri}
            controls
            playing={false}
            className="max-w-[600px] max-h-[600px] rounded-t-lg border border-richblack-700"
          />
        </div>
        <div className="flex flex-col mt-12">
          <p className="text-4xl text-brown-400">{courseData?.courseName}</p>
          <p className="text-2xl text-richblack-5 mt-4">
            {sectionData?.[0]?.sectionName}
          </p>
          <p className="mt-2 text-richblack-25 text-lg">
            {subSectionData?.[0]?.title}
          </p>
        </div>
      </div>

      {/* part-2 */}

      <div>
        <div ref={containerRef} className={`relative w-[60%] min-h-[400px] mt-24 flex justify-center items-center`}>
          {/* video */}
          <video
            className={`rounded-lg`}
            src={uri}
            controls={false}
            ref={videoRef}
            onLoadedMetadata={() => {
              setDuration(videoRef.current.duration);
            }}
            onTimeUpdate={() => {
              setCurrentProgress(videoRef.current.currentTime);
            }}
          ></video>

          {/* controls */}
          <div className="text-black absolute bottom-0 right-0 left-0">
            <div className="flex flex-col mx-2 mb-2">
              {/* Progress Bar */}
              <input
                type="range"
                min="0"
                max={duration}
                step="0.1"
                value={currentProgress}
                onChange={handleSeek}
                className="w-full appearance-auto bg-pure-greys-700 rounded-lg h-2 cursor-pointer"
              />

              {/* actions */}
              <div className="flex items-center justify-between w-full mt-2">
                {/* left */}
                <div className="flex items-center gap-6">
                  {/* play/pause */}
                  <button
                    className="text-lg hover:bg-richblack-700 p-2 duration-200 transition-all rounded-full text-richblack-5"
                    onClick={handlePlay}
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  {/* back/go */}
                  <div className="flex gap-4 items-center text-xl text-richblack-5">
                    <button onClick={()=>{
                      if(videoRef.current){
                        videoRef.current.currentTime -= 5; 
                        setCurrentProgress(currentProgress-5);
                      }
                    }}>
                      <FaBackward />
                    </button>
                    <button onClick={()=>{
                      if(videoRef.current){
                        videoRef.current.currentTime += 5; 
                        setCurrentProgress(currentProgress+5);
                      }
                    }}>
                      <FaForward />
                    </button>
                  </div>
                </div>
                {/* right */}
                <div>
                  {/* full-screen */}
                  <button
                    onClick={handleSize}
                    className="text-lg font-extrabold p-2 duration-200 transition-all hover:scale-125 text-richblack-5"
                  >
                    {isFull ? <RiFullscreenExitLine /> : <RiFullscreenFill />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureContent;
