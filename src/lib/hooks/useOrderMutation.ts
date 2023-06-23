import { useMutation } from '@tanstack/react-query';
import { addOrder } from '../api';

export function useOrderMutation() {
  return useMutation({ mutationFn: addOrder });
}
