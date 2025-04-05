/* eslint-disable react/prop-types */
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'

const ResumeCard = () => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out ">
        <div className='flex items-center justify-between'>
            <div>
                <h6 className="text-sm font-medium">title</h6>
                <span className="text-x5 text-slate-500">date 2-55</span>
            </div>
            <MdOutlinePushPin className={`icon-btn `} />

        </div>
        <p className='text-xs text-slate-600 mt-2'>Lorem ipsum dolor sit amet consectetur, a quos accusantium at.</p>

        <div className='flex items-center justify-between mt-2'>
            <div className="text-xs text-slate-500">tagss</div>
            <div className="flex items-center gap-2">
                <MdCreate className=" icon-btn hover:text-green-600"  />
                <MdDelete className=" icon-btn hover:text-red-500"  />
            </div>
        </div>
    </div>
  )
}

export default ResumeCard;