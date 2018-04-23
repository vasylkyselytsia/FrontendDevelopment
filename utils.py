import os


class Util(object):
    FILE_FLAGS = os.O_CREAT | os.O_EXCL | os.O_WRONLY
    DIR_LIST = ["logs", "CarSale/media", "CarSale/staticfiles", "CarSale/static"]
    FILE_LIST = ["logs/logfile.txt"]

    @classmethod
    def run(cls):
        for _dir in cls.DIR_LIST:
            if not os.path.exists(_dir):
                os.makedirs(_dir)
        for file in cls.FILE_LIST:
            if not os.path.exists(file):
                os.open(file, cls.FILE_FLAGS)
