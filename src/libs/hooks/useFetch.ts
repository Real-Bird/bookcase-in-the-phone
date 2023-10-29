import { useEffect, useState } from "react";

type State<S> = { state: S | null; loading: boolean; error: Error | null };

export function useFetch<T>(asyncFn: () => Promise<T>, hasTrigger?: boolean) {
  const [state, setState] = useState<State<T>>({
    state: null,
    loading: true,
    error: null,
  });

  const onFetching = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await asyncFn();
      setState({
        ...state,
        state: data,
      });
    } catch (e) {
      setState({ ...state, error: e as Error });
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (hasTrigger) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }
    asyncFn()
      .then((data) =>
        setState({
          ...state,
          state: data,
        })
      )
      .catch((e) => setState({ ...state, error: e as Error }))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }, []);

  return { ...state, onFetching };
}

// export const useFetch: UseFetchProps<T, S> = (fn, trigger) => {
//   const [state, setState] = useState<S>({
//     state: null,
//     loading: true,
//     error: null,
//   });

//   useEffect(() => {
//     fn()
//       .then((data) =>
//         setState({
//           ...state,
//           state: data,
//           loading: false,
//         })
//       )
//       .catch((e) => setState({ ...state, loading: false, error: e }));
//   }, [trigger]);

//   return { state };
// };
