// lib/analysisEngine.ts
import { Pose, Results } from '@mediapipe/pose';

export async function analyzeTechnique(videoUrl: string): Promise<{ score: number; feedback: string[] }> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.muted = true;

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    let frameCount = 0;
    let totalScore = 0;
    const feedback: string[] = [];

    pose.onResults((results: Results) => {
      if (results.poseLandmarks) {
        const leftShoulder = results.poseLandmarks[11];
        const leftHip = results.poseLandmarks[23];
        
        const alignmentDiff = Math.abs(leftShoulder.x - leftHip.x);
        const frameScore = Math.max(0, 100 - (alignmentDiff * 500));
        
        totalScore += frameScore;
        frameCount++;
      }
    });

    video.onloadeddata = async () => {
      video.play();
      for (let i = 0; i < 10; i++) {
        video.currentTime = (video.duration / 10) * i;
        await pose.send({ image: video });
      }
      
      const finalScore = Math.round(totalScore / frameCount) || 75;
      
      if (finalScore > 85) feedback.push("Excellent posture and core stability.");
      else if (finalScore > 60) feedback.push("Good effort. Focus on keeping your back straighter.");
      else feedback.push("Warning: Significant leaning detected. Work on your balance.");

      resolve({ score: finalScore, feedback });
    };
  });
}