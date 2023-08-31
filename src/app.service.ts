import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from './schemas/participant.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
  ) {}

  async countAll() {
    // participant.count();
    const all = await this.participantModel.count();
    return { all };
  }

  async create(participantData) {
    // participant.create();
    const participant = await this.participantModel.create(participantData);
    return participant;
  }

  async getResult() {
    const getKoreaCount = this.participantModel
      .find({ sharedBy: 'KOREA' })
      .count();
    const getYonseiCount = this.participantModel
      .find({ sharedBy: 'YONSEI' })
      .count();
    return await Promise.all([getKoreaCount, getYonseiCount]).then(
      ([korea, yonsei]) => ({ korea, yonsei }),
    );
  }

  async countUniversity() {
    const participants = await this.participantModel.find();

    const koreaCheerCount = participants.filter(
      (participant) => participant.sharedBy === 'KOREA',
    ).length;
    const yonseiCheerCount = participants.filter(
      (participant) => participant.sharedBy === 'YONSEI',
    ).length;

    const koreaCheerYonseiCount = participants.filter(
      (participant) =>
        participant.university === 'KOREA' && participant.sharedBy === 'YONSEI',
    ).length;
    const yonseiCheerKoreaCount = participants.filter(
      (participant) =>
        participant.university === 'YONSEI' && participant.sharedBy === 'KOREA',
    ).length;

    return {
      koreaCheerCount,
      yonseiCheerCount,
      koreaCheerYonseiCount,
      yonseiCheerKoreaCount,
    };
  }
}
