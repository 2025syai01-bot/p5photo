let faceMesh;
let video;
let img;
let bgimg;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };

let captureButton;
let sendButton;
let emailInput;
let capturedImage; // 저장된 이미지

function preload() {
  faceMesh = ml5.faceMesh(options, {flipped:true});
  img = loadImage('crown.png');
  bgimg = loadImage('bgimg.png');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, {flipped:true});
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);  

  // 📸 사진 찍기 버튼
  captureButton = createButton('📸 사진찍기');
  captureButton.position(10, 500);
  captureButton.mousePressed(capturePhoto);
  
  // ✉️ 메일보내기 버튼
  sendButton = createButton('✉️ 메일보내기');
  sendButton.position(330, 500);
  sendButton.mousePressed(sendEmail);
}

function draw() {
  image(video, 0, 0, width, height);
    
  if (faces.length > 0 && faces[0].lips) {
    image(
      img, 
      faces[0].faceOval.x,
      faces[0].faceOval.y-(faces[0].faceOval.height/1.7),
      faces[0].faceOval.width,
      faces[0].faceOval.height/2
    );
    
    fill('red');
    circle(
      faces[0].lips.x+(faces[0].lips.width/2), 
      faces[0].lips.y - (faces[0].lips.height*1.3), 
      faces[0].lips.width/1.5
    );
  }

  image(bgimg, 0, 0, width, height);
  
  textSize(30);
  fill('purple');
   let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  
  let dateString = year + "." + nf(month, 2) + "." + nf(day, 2);

  text(dateString +'. 영종AI융합센터❤️',200,40);
}

function gotFaces(results) {
  faces = results;
}

// -----------------------------
// 📸 사진찍기 기능
// -----------------------------
function capturePhoto() {
  // 캔버스 내용을 이미지로 저장
  saveCanvas('myPhoto', 'jpg');
  
  // 이미지 데이터를 저장해둠 (이후 이메일 전송에 사용)
  capturedImage = canvas.toDataURL('image/jpeg');
  alert('사진이 저장되었습니다!');
}

// -----------------------------
// ✉️ 메일 보내기 기능 (EmailJS 이용)
// -----------------------------
function sendEmail() {
  if (!capturedImage) {
    alert('먼저 사진을 찍어주세요!');
    return;
  }
  // 새 탭에서 Gmail inbox 페이지 열기
  window.open('https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox', '_blank');

}
