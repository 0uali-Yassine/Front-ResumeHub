/* eslint-disable react/prop-types */
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate, MdDelete } from 'react-icons/md'

const ResumeCard = () => {
    return (
        <div className="card border rounded p-3 bg-white shadow-sm transition">
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h6 className="mb-1 small fw-medium">title</h6>
                    <small className="text-muted">date 2-55</small>
                </div>
                <MdOutlinePushPin className="icon-btn cursor-pointer" />
            </div>

            <p className="small text-muted mt-2 mb-0">
                Lorem ipsum dolor sit amet consectetur, a quos accusantium at.
            </p>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">tagss</small>
                <div className="d-flex gap-2">
                    <MdCreate className="icon-btn text-muted cursor-pointer hover-text-success" />
                    <MdDelete className="icon-btn text-muted cursor-pointer hover-text-danger" />
                </div>
            </div>
        </div>

    )
}

export default ResumeCard;