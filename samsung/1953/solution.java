import java.util.Scanner;
import java.io.FileInputStream;
import java.util.Arrays;
import java.util.Stack;

class Solution {
    static boolean tunnel[][] = { { false, false, false, false }, { true, true, true, true },
            { true, false, true, false }, { false, true, false, true }, { true, true, false, false },
            { false, true, true, false }, { false, false, true, true }, { true, false, false, true } };
    static int direction[][] = { { -1, 0 }, { 0, 1 }, { 1, 0 }, { 0, -1 } };

    static class position {
        int x;
        int y;

        position(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    public static void main(String args[]) throws Exception {
        /*
         * for (int i = 0; i < tunnel.length; i++) {
         * System.out.println(Arrays.toString(tunnel[i])); }
         */

        Scanner sc = new Scanner(System.in);
        int T;
        T = sc.nextInt();
        for (int test_case = 1; test_case <= T; test_case++) {
            // 세로 크기 N, 가로 크기 M, 맨홀 뚜껑이 위치한장소의 세로 위치 R, 가로 위치 C, 그리고 탈출 후 소요된 시간 L
            int N = sc.nextInt();
            int M = sc.nextInt();
            int R = sc.nextInt();
            int C = sc.nextInt();
            int L = sc.nextInt();

            int answer = 0;

            boolean[][] visited = new boolean[N + 2][M + 2];
            int[][] map = new int[N + 2][M + 2];

            for (int i = 1; i < N + 1; i++) {
                for (int j = 1; j < M + 1; j++) {
                    map[i][j] = sc.nextInt();
                    visited[i][j] = false;
                }
            }

            for (int i = 0; i < N + 2; i++)
                for (int j = 0; j < M + 2; j++) {
                    if (i == 0 || j == 0 || i == N + 1 || j == M + 1) {
                        map[i][j] = 0;
                    }
                }

            visited[R + 1][C + 1] = true;
            answer = 0;
            int time = 1;
            Stack s = new Stack();
            s.push(new position(R + 1, C + 1));
            for (; time <= L; time++) {
                Stack temp = new Stack();
                while (!s.empty()) {
                    position p = (position) s.pop();
                    int i = p.x;
                    int j = p.y;
                    answer++;
                    for (int d = 0; d < 4; d++) {
                        int newx = direction[d][0] + i;
                        int newy = direction[d][1] + j;

                        if (!visited[newx][newy]
                                && (tunnel[(map[newx][newy])][(d + 2) % 4] && tunnel[(map[i][j])][d])) {
                            temp.push(new position(newx, newy));
                            visited[newx][newy] = true;

                        }
                    }
                }
                // System.out.println();
                // if(test_case==2&&time==5) for(int i = 0 ; i < visited.length;
                // i++)System.out.println(Arrays.toString(visited[i]));
                // System.out.println();
                s = temp;
                // System.out.println(answer);
            }

            // System.out.println();

            System.out.println("#" + test_case + " " + (answer));
            /////////////////////////////////////////////////////////////////////////////////////////////
            /*
             * 이 부분에 여러분의 알고리즘 구현이 들어갑니다.
             */
            /////////////////////////////////////////////////////////////////////////////////////////////

        }

    }
}