type ProgressBarProps = {
  bgcolor: string;
  progress: number;
  height: number;
};

export const ProgressBar = ({bgcolor, progress, height}: ProgressBarProps) => {
    
    const Parentdiv = {
      height: height,
      width: '100%',
      backgroundColor: 'whitesmoke',
      borderRadius: 40,
      margin: 10
    }

    const Childdiv = {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: bgcolor,
      borderRadius:40,
      "text-align": "right"
    }

      return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
      </div>
    </div>
    )
}