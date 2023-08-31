import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Participant } from './schemas/participant.schema';

@Controller()
export class AppController {
  constructor(private readonly participantsService: AppService) {}

  // 현재 참여자 수 반환 (랜딩페이지에서 필요)
  @Get('')
  async countAll() {
    return await this.participantsService.countAll();
  }

  // 참여자 데이터 생성 및 고대 vs 연대 결과 반환 (마지막 종목을 선택할 때 호출)
  @Post('')
  async create(@Body() body: { university: string; sharedBy: string }) {
    const participant: Participant = {
      ...body,
      createdAt: new Date().toISOString(),
    };
    await this.participantsService.create(participant);
    return await this.participantsService.getResult();
  }

  // 학교별 참여자 수 반환 (결과 페이지에서 필요)
  @Get('result')
  async countUniversity() {
    return await this.participantsService.countUniversity();
  }
}
