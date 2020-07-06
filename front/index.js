var PROTO_PATH = __dirname + '/../proto/front.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var grpc_promise = require('grpc-promise');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var back = grpc.loadPackageDefinition(packageDefinition).back;
var calc = grpc.loadPackageDefinition(packageDefinition).calc;
var back_client = new back.BackService('localhost:50051', grpc.credentials.createInsecure());
var calc_client = new calc.CalcService('localhost:50052', grpc.credentials.createInsecure());

process.stdin.on('data', async function (data) {
    try {
        back_client.Show({id:Number(data)},(err,res)=>{
            if (err) {console.log(err)
            }else{
            console.log(res)}
        })
        calc_client.Sum({elem:[Number(data),Number(data)]},(err,res)=>{
            if (err) {console.log(err)
            }else{
            console.log(res)}
        })
/*        grpc_promise.promisifyAll(client);
        client.Show()
        .sendMessage({id:10})
        .then((res)=>{console.log(res)})*/
    } catch (err) {
        console.error(err.stack || err)
    }
})