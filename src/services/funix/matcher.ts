import axios from 'axios';
import { FUNIX_BASE_URL } from '../../constants';
import {
  GenerateRequest,
  GenerateResponse,
  MatchingIDRequest,
  MatchingIDResponse,
  MatchRequest,
  MatchResponse,
  RecommendationRequest,
  RecommendationResponse,
  StatusRequest,
  StatusResponse,
} from '../../models/funix/matcher';

export const matcher = axios.create({
  baseURL: FUNIX_BASE_URL + 'matcher/',
});

export const createRoom = async (data: GenerateRequest) =>
  (await matcher.post('generate', data)).data as GenerateResponse;

export const joinRoom = async (data: MatchRequest) =>
  (await matcher.post('match', data)).data as MatchResponse;

export const getRoomStatus = async (data: StatusRequest) =>
  (await matcher.get('status', { params: data })).data as StatusResponse;

export const getRoomID = async (data: MatchingIDRequest) =>
  (await matcher.get('matching_id', { params: data }))
    .data as MatchingIDResponse;

export const getRecommendation = async (data: RecommendationRequest) =>
  (await matcher.get('recommendation', { params: data }))
    .data as RecommendationResponse;
