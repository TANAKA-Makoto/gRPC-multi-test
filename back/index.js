var PROTO_PATH = __dirname + '/../proto/back.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var backbone_proto = grpc.loadPackageDefinition(packageDefinition).back;
var show = function (call,callback) {
	console.log('called'+call.request.id)
	let res = {id:call.request.id,name:"doragons",members:["ichi","ni"]}
	callback(null, res);
}
var grpc_server = new grpc.Server();
  grpc_server.addService(backbone_proto.BackService.service, {
    Show:show
  });
grpc_server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
grpc_server.start();
