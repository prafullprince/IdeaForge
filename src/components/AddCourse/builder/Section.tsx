import { memo, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditzSection,
  setEditzSubSection,
  setSection,
} from "../../../slices/courseSlice";
import { IModalData } from "../../Dashboard/Sidebar";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  deleteSectionApi,
  deleteSubSectionApi,
} from "../../../services/apiCall/course";
import { IoMdAdd } from "react-icons/io";
import AddModal from "../AddModal";

const Section = ({ section, setRefresh, setValue }: any) => {
  // store
  const { course, editzSection } = useSelector((state: any) => state.course);
  const { token } = useSelector((state: any) => state.auth);

  // hook
  const dispatch = useDispatch();

  // state
  const [visible, setVisible] = useState(false);

  // modal state
  const [modalData, setModalData] = useState<IModalData | null>(null);
  const [addLectureModal, setAddLectureModal] = useState<any | null>(null);
  // const [viewLectureModal, setViewLectureModal] = useState(null);

  // deleteHandler-section
  async function deleteHandler() {
    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append("sectionId", section._id);
    await deleteSectionApi(formData, token);
    setModalData(null);
    setRefresh((prev: any) => !prev);
  }

  // deleteSubSecHandler
  async function deleteSubSecHandler(subSectionId: any) {
    try {
      const formData = new FormData();
      formData.append("sectionId", section._id);
      formData.append("subSectionId", subSectionId);
      await deleteSubSectionApi(formData, token);
      setRefresh((prev: any) => !prev);
      setModalData(null);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col w-full">
      <div
        onClick={() => setVisible((prev) => !prev)}
        className="w-full relative hover:shadow-sm hover:shadow-blue-100 bg-richblack-700 hover:bg-richblack-800 transition-all duration-300 px-4 py-3 rounded-t-lg cursor-pointer flex justify-between items-center"
      >
        <div className="flex gap-4 items-center">
          <RxDropdownMenu className="text-2xl" />
          <p className="">{section?.sectionName.substring(0,10)}..</p>
        </div>
        {/* buttons */}
        <div className="flex items-center gap-4 text-richblack-25">
          <FiEdit
            onClick={(e) => {
              if (editzSection) {
                dispatch(setEditzSection(false));
                dispatch(setSection(null));
                setValue("sectionName", "");
                e.stopPropagation();
                return;
              }
              dispatch(setEditzSection(true));
              dispatch(setSection(section));
              e.stopPropagation();
            }}
            className="text-xl hover:text-yellow-50 transition-all duration-200"
          />
          <MdDelete
            onClick={() => {
              setModalData({
                text1: "Are you sure?",
                text2: "This section will be deleted",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => deleteHandler(),
                btn2Handler: () => setModalData(null),
                heading: "Section deletion modal",
              });
            }}
            className="text-2xl hover:text-pink-200 transition-all duration-200"
          />
          <MdOutlineArrowDropDownCircle className="text-2xl hover:text-caribbeangreen-200 transition-all duration-200" />
        </div>
      </div>
      {/* subSec */}
      {visible && (
        <div
          className={`w-full bg-richblack-800 flex flex-col gap-2 py-3 transition-all ease-in-out duration-500 border-t rounded-sm border-richblack-500`}
        >
          {/* subSection */}
          {section?.subSections?.map((subSec: any) => (
            <div
              className="w-full relative pl-10 pr-2 py-1 cursor-pointer flex flex-col gap-3 hover:scale-95 transition-all duration-300"
              key={subSec?._id}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <RxDropdownMenu className="text-2xl" />
                  <p>{subSec?.title}</p>
                </div>
                {/* buttons */}
                <div className="flex items-center gap-4 text-richblack-25">
                  <FiEdit
                    onClick={(e) => {
                      dispatch(setEditzSubSection(true));
                      setAddLectureModal({
                        subSectionId: subSec._id,
                        subSectionDetails: subSec,
                      });
                      e.stopPropagation();
                    }}
                    className="text-xl hover:text-yellow-50 transition-all duration-200"
                  />
                  <MdDelete
                    onClick={() => {
                      setModalData({
                        text1: "Are you sure?",
                        text2: "This sub-section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => deleteSubSecHandler(subSec?._id),
                        btn2Handler: () => setModalData(null),
                        heading: "SubSection deletion modal",
                      });
                    }}
                    className="text-2xl hover:text-pink-200 transition-all duration-200"
                  />
                  <MdOutlineArrowDropDownCircle className="text-2xl hover:text-caribbeangreen-200 transition-all duration-200" />
                </div>
              </div>
              <div className="border-b border-opacity-15 border-richblack-100"></div>
            </div>
          ))}
          {/* add lecture */}
          <div className="w-full flex justify-start px-4 mt-2">
            <button
              onClick={() => setAddLectureModal({ sectionId: section._id })}
              className="flex items-center gap-1 text-[#FFD60A] font-medium"
            >
              <IoMdAdd className="text-2xl font-extrabold" />
              <p className="text-base">Add Lecture</p>
            </button>
          </div>
        </div>
      )}
      {modalData && (
        <ConfirmationModal modalData={modalData} setModalData={setModalData} />
      )}
      {addLectureModal && (
        <AddModal
          addLectureModal={addLectureModal}
          setAddLectureModal={setAddLectureModal}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default memo(Section);
