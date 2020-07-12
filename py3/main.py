from concurrent import futures
import logging
import time

import grpc

import calc_pb2
import calc_pb2_grpc


class Calc(calc_pb2_grpc.CalcService):

    def Sum(self, request, context):
        res = sum(request.elem)
        return calc_pb2.SumResponse(result=res)

    def DelayHello(self, request, context):
        time.sleep(request.time)
        res = "hello" + str(request.time)
        return calc_pb2.HelloResponse(msg=res)


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    calc_pb2_grpc.add_CalcServiceServicer_to_server(Calc(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    server.wait_for_termination()


def main():
    logging.basicConfig()
    serve()


if __name__ == '__main__':
    main()
