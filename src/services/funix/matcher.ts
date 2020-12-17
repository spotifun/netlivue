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
  baseURL: FUNIX_BASE_URL,
});

export const generate = async (data: GenerateRequest) =>
  (await matcher.post('generate', data)) as GenerateResponse;

export const match = async (data: MatchRequest) =>
  (await matcher.post('match', data)) as MatchResponse;

export const status = async (data: StatusRequest) =>
  (await matcher.get('status', { params: data })) as StatusResponse;

export const matchingID = async (data: MatchingIDRequest) =>
  (await matcher.get('matching_id', { params: data })) as MatchingIDResponse;

export const recommendation = async (data: RecommendationRequest) =>
  (await matcher.get('recommendation', {
    params: data,
  })) as RecommendationResponse;
