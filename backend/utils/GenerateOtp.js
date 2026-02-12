import randomstring from "randomstring";

const GenerateOtp = () => {
    return randomstring.generate({
        length: 6,
        charset: "numeric"
    });
}

export default GenerateOtp;

