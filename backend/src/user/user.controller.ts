import { GoogleGenerativeAI } from '@google/generative-ai';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dotenv from 'dotenv';
import { User } from 'src/user/user.schema';
import { UserService } from './user.service';

@Controller('/api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  async Signup(@Res() response, @Body() user: User) {
    console.log(user);
    const newUSer = await this.userService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }

  @Post('/signin')
  async SignIn(@Res() response, @Body() user: User) {
    const token = await this.userService.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }

  async run(
    ingredients = [
      'water',
      'milk',
      'apple',
      'banana',
      'cement',
      'lead',
      'beer',
    ],
    allergies = ['milk'],
  ) {
    const genAI = new GoogleGenerativeAI(
      'AIzaSyBzfw8a69jWdmLa46WdBesTLQzaEOQnmAw',
    );
    dotenv.config();
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    let onlyRating = 'answer with the number ONLY. no other words.';
    let onlyRating2 =
      "answer with the object, then ':', then the rating ONLY. no other words.";
    let oneSentence =
      'answer with only one sentence explaining it. no other words.';
    let rateObject =
      'rate the next objects on a 1-10 scale based on nutritional value and health cons.';
    let allergicTo = 'including the fact that a person is allergic to ';
    let allergiesInSentence =
      allergies[0] !== 'nothing' ? `${allergicTo} ${allergies.join(',')}.` : '';
    let currentObject = `the objects are ${ingredients.join(',')}.`;

    const result = await model.generateContent([
      `${rateObject}${onlyRating2}${allergiesInSentence}${currentObject}`,
      // {inlineData: {data: Buffer.from(fs.readFileSync('path/to/image.png')).toString("base64"),
      // mimeType: 'image/png'}}
    ]);
    console.log(result.response.text());
  }
}
