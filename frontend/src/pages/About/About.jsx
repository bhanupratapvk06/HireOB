import { FaQ, FaRegCircleCheck } from 'react-icons/fa6';
import './About.css';
import { CiCircleCheck, CiCirclePlus } from "react-icons/ci";
import { LuBriefcase, LuFileText, LuUserRound } from 'react-icons/lu';
import VideoCta from '../../components/VideoCTA/VideoCta';

const About = () => {

    const faqs = [
        {
            id: 1,
            number: "01",
            question: "Can I upload a CV?",
            answer:
                "Yes, you can upload your CV directly to your profile. This allows employers to view your experience and helps us match you with relevant job opportunities faster.",
            open: true
        },
        {
            id: 2,
            number: "02",
            question: "How long will the recruitment process take?",
            answer:
                "The recruitment timeline varies depending on the employer and role. Typically, you can expect feedback within one to two weeks after submitting your application.",
            open: false
        },
        {
            id: 3,
            number: "03",
            question: "What does the recruitment and selection process involve?",
            answer:
                "Most hiring processes include an initial application review, interviews, technical assessments, and final discussions with the hiring team.",
            open: false
        },
        {
            id: 4,
            number: "04",
            question: "Do you recruit for Graduates, Apprentices and Students?",
            answer:
                "Yes, we regularly feature entry-level roles, internships, and graduate opportunities designed to help early-career professionals gain industry experience.",
            open: false
        },
        {
            id: 5,
            number: "05",
            question: "Can I receive notifications for any future jobs that may interest me?",
            answer:
                "You can enable job alerts from your dashboard to receive personalized notifications based on your skills, preferences, and saved searches.",
            open: false
        }
    ];


    const steps = [
        {
            id: 1,
            icon: <LuUserRound size={28} />,
            title: "Create Account",
            desc: "Sign up and create your professional profile to get started."
        },
        {
            id: 2,
            icon: <LuFileText size={28} />,
            title: "Upload Resume",
            desc: "Add your resume so employers can discover your skills."
        },
        {
            id: 3,
            icon: <LuBriefcase size={28} />,
            title: "Find Jobs",
            desc: "Browse thousands of jobs that match your experience."
        },
        {
            id: 4,
            icon: <FaRegCircleCheck size={28} />,
            title: "Apply Job",
            desc: "Submit applications easily and track your progress."
        }
    ];



    return (
        <div className="about">
            <div className="opening">
                <h1>About Us</h1>
            </div>

            <div className="about-container">

                <div className="info">
                    <div className="content">
                        <h1>
                            Connecting Talent with the Right Opportunities
                        </h1>
                        <p>
                            HireOB is built to simplify the hiring journey for both job seekers and employers.
                            We help professionals discover roles that match their skills and career goals,
                            while enabling companies to find qualified talent faster through a streamlined,
                            transparent recruitment process.
                        </p>
                    </div>
                    <VideoCta/>
                </div>


                <div className="how-it-works">
                    <h1>How It Works</h1>
                    <p>
                        Create your profile, explore opportunities that match your skills, and apply to jobs easily through a simple and streamlined hiring platform.
                    </p>


                    <div className='video'>
                        <div className='play'>

                        </div>
                        <div className='steps'>
                            {steps.map(step => (
                                <div className="step-card" key={step.id}>
                                    <div className="icon">{step.icon}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.desc}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <div className="faqs">
                    <h1>Frequenty Asked Questions</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur, qui!</p>

                    <div className='cards'>
                        {
                            faqs.map((faq) => (
                                <div className='faq'>
                                    <div>{faq.number}</div>
                                    <div>
                                        <h1>{faq.question}</h1>
                                        <p>{faq.answer}</p>
                                    </div>
                                    <div className='open-btn'>
                                        <CiCirclePlus size={30} color='#309689' />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;